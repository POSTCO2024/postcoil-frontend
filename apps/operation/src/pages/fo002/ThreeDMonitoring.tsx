import React, { useEffect } from 'react';
import * as THREE from 'three';
import { PMREMGenerator } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

import styles from './ThreeDMonitoring.module.scss';

let clipPlaneX: any;
let clipPlaneX2: any;
let clipPlaneX3: any;

const clipSpeed: number = 11.5; // 클리핑 영역의 이동 속도
const clipDirection: number = 1; // 1이면 나타남, -1이면 사라짐

let cube017Heating: any = null; // 색상을 변경할 메쉬를 저장할 변수
let timePassed: number = 0; // 시간 경과를 추적할 변수
const cube017ChangeTime: number = 8; // 색 변경 시간

let cubeColling: any = null;
let cubeColling2: any = null;
const cubeCollingChangeTime: number = 14.5;

const duration: number = 1; // 색상이 서서히 바뀌는 데 걸리는 시간 (초)
const startColor: number = new THREE.Color(0x000000); // 초기 색상 (흰색)
const endColor: number = new THREE.Color(0x9c0c27); // 목표 색상 (빨간색)
let lerpProgress: number = 0; // 보간 비율 (0에서 1로 변함)

const endCoolColor = new THREE.Color(0x0a22c2);

class App {
  constructor() {
    const divContainer = document.querySelector('#webgl-container');
    this._divContainer = divContainer;

    // 카메라 배열 설정
    this._cameras = [];
    this._smallCameras = [];

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    divContainer.appendChild(renderer.domElement);

    this._renderer = renderer;

    const scene = new THREE.Scene();
    this._scene = scene;

    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    //this._infoDiv = document.getElementById('info'); // info div를 참조

    // 마우스 클릭 이벤트 등록
    window.addEventListener('click', this._onMouseClick.bind(this));
    window.addEventListener('resize', () => {
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      this._camera.aspect = window.innerWidth / window.innerHeight;
      this._camera.updateProjectionMatrix();
    });

    this._setupCamera();
    this._setupModel();
    this._setupControls();
    this._setupEventListeners();
    this._setupEnvironmentMap();

    this._setupLight();

    this._clock = new THREE.Clock();
    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  _setupEnvironmentMap() {
    // PMREMGenerator는 환경맵을 샘플링하여 성능을 높여줌
    const pmremGenerator = new PMREMGenerator(this._renderer);
    pmremGenerator.compileEquirectangularShader();

    // HDR 이미지 로드
    new RGBELoader().load('image.hdr', (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;

      this._scene.environment = envMap; // 씬의 환경맵으로 설정
      this._scene.background = new THREE.Color(0xacacac); // 씬의 배경을 환경맵으로 설정

      texture.dispose();
      pmremGenerator.dispose();
    });
  }

  _initView() {
    this._controls1.target = new THREE.Vector3(15, 0, 0);
    this._controls1.update();
    this._controls2.target = new THREE.Vector3(100, 0, 0);
    this._controls2.update();
    this._controls3.target = new THREE.Vector3(210, 0, 0);
    this._controls3.update();
    this._controls4.target = new THREE.Vector3(250, 0, 0);
    this._controls4.update();
  }

  _setupControls() {
    this._controls1 = new OrbitControls(this._camera1, this._divContainer);
    this._controls2 = new OrbitControls(this._camera2, this._divContainer);
    this._controls3 = new OrbitControls(this._camera3, this._divContainer);
    this._controls4 = new OrbitControls(this._camera4, this._divContainer);

    this._initView();
    // 처음에는 모든 카메라의 컨트롤을 비활성화
    this._controls1.enabled = false;
    this._controls2.enabled = false;
    this._controls3.enabled = false;
    this._controls4.enabled = false;

    const stats = new Stats();
    this._divContainer.appendChild(stats.dom);
    this._fps = stats;
  }

  _setupModel() {
    new GLTFLoader().load('./cold_factory_final.glb', (gltf) => {
      const model = gltf.scene;
      this._scene.add(model);

      // 모델 내부의 모든 메쉬의 머티리얼을 적절히 설정
      model.traverse((child) => {
        if (child.isMesh) {
          // 법선 재계산 (필요시)
          child.geometry.computeVertexNormals();
          // 양면 렌더링 설정 (앞면/뒷면 모두 보이게)
          child.material.side = THREE.DoubleSide;

          if (child.material.map) {
            child.material = new THREE.MeshStandardMaterial({
              map: child.material.map, // 텍스처 유지
              metalness: child.material.metalness, // 금속성
              roughness: child.material.roughness, // 거칠기
              envMap: this._scene.environment, // 환경 맵 적용
              envMapIntensity: 1.5,
              side: THREE.DoubleSide, // 양면 렌더링
            });
          } else {
            // 텍스처가 없는 경우 기본 색상 또는 원래 머티리얼 사용
            child.material = new THREE.MeshBasicMaterial({
              color: child.material.color || 0xffffff, // 기본적으로 흰색 설정, 기존 색상이 있으면 유지
              side: THREE.DoubleSide,
            });
          }

          // 코일이 롤러 따라 이동하는 부분
          if (child.name === 'Plane') {
            // 클리핑 플레인 설정 (X축 기준으로 왼쪽에서부터 메쉬를 잘라냄)
            clipPlaneX = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 8); // X축 방향으로 왼쪽에서 시작
            child.material.clippingPlanes = [clipPlaneX]; // 메쉬에 클리핑 플레인 적용
            child.material.clipShadows = true; // 그림자에도 클리핑 플레인을 적용

            const planeHelper = new THREE.PlaneHelper(
              clipPlaneX,
              200,
              0xff0000,
            ); // 클리핑 플레인을 시각적으로 확인
            this._scene.add(planeHelper);
          }
          if (child.name === 'Plane002') {
            // 클리핑 플레인 설정 (X축 기준으로 왼쪽에서부터 메쉬를 잘라냄)
            clipPlaneX2 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0); // X축 방향으로 왼쪽에서 시작
            child.material.clippingPlanes = [clipPlaneX2]; // 메쉬에 클리핑 플레인 적용
            child.material.clipShadows = true; // 그림자에도 클리핑 플레인을 적용

            const planeHelper2 = new THREE.PlaneHelper(
              clipPlaneX2,
              200,
              0xff0000,
            ); // 클리핑 플레인을 시각적으로 확인
            this._scene.add(planeHelper2);
          }
          if (child.name === 'Plane003') {
            // 클리핑 플레인 설정 (X축 기준으로 왼쪽에서부터 메쉬를 잘라냄)
            clipPlaneX3 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 290); // X축 방향으로 왼쪽에서 시작
            child.material.clippingPlanes = [clipPlaneX3]; // 메쉬에 클리핑 플레인 적용
            child.material.clipShadows = true; // 그림자에도 클리핑 플레인을 적용

            const planeHelper3 = new THREE.PlaneHelper(
              clipPlaneX3,
              200,
              0xff0000,
            ); // 클리핑 플레인을 시각적으로 확인
            this._scene.add(planeHelper3);
          }

          // 코일 처음 가열 부분
          if (child.name === 'Cube017') {
            cube017Heating = child;
          }

          // 코일 냉각 부분
          if (child.name === 'Cube') {
            cubeColling = child;
          }
          if (child.name === 'Cube008') {
            cubeColling2 = child;
          }

          if (child.name === 'Plane001') {
            child.material = new THREE.MeshBasicMaterial({
              color: 0xffffff,
              side: THREE.DoubleSide,
            });
          }
        }
      });

      const box = new THREE.Box3().setFromObject(model);

      const axisHelper = new THREE.AxesHelper(500);
      this._scene.add(axisHelper);

      const boxHelper = new THREE.BoxHelper(model);
      this._scene.add(boxHelper);

      this._boxHelper = boxHelper;
      this._model = model;
      this._box = box;

      this._mixer = new THREE.AnimationMixer(model);

      const animations = gltf.animations;
      if (animations && animations.length) {
        // 첫 번째 애니메이션 클립을 가져와 실행
        const action = this._mixer.clipAction(animations[0]);
        action.play();
      }
      this._renderer.localClippingEnabled = true; // 반드시 클리핑이 로컬에 적용되도록 설정

      console.log(gltf.animations);
    });
  }

  _setupCamera() {
    // 4개의 카메라 설정
    this._camera1 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    this._camera1.position.set(-10, 30, 50); // 카메라 위치

    this._camera2 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    this._camera2.position.set(70, 50, 70);

    this._camera3 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    this._camera3.position.set(250, 50, 70);

    this._camera4 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    this._camera4.position.set(330, 40, 50);

    // 카메라 배열에 추가
    this._cameras = [
      this._camera1,
      this._camera2,
      this._camera3,
      this._camera4,
    ];
    this._selectedCamera = this._camera1; // 기본 선택 카메라는 첫 번째 카메라

    // 작은 화면에 표시할 나머지 카메라 설정
    this._smallCameras = [this._camera2, this._camera3, this._camera4];
  }

  _addPointLight(x, y, z, helperColor) {
    const color = 0xffffff;
    const intensity = 1.5;

    const pointLight = new THREE.PointLight(color, intensity, 2000);
    pointLight.position.set(x, y, z);

    this._scene.add(pointLight);

    const pointLightHelper = new THREE.PointLightHelper(
      pointLight,
      10,
      helperColor,
    );
    this._scene.add(pointLightHelper);
  }

  _setupLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // 밝은 주변광
    this._scene.add(ambientLight);
    this._addPointLight(350, 30, 50, 0xff0000);
    this._addPointLight(-10, 30, 50, 0xffff00);
    this._addPointLight(-10, 30, -80, 0x00ff00);
    this._addPointLight(350, 30, -80, 0x0000ff);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 강한 직사광
    directionalLight.position.set(150, 30, 50).normalize();
    this._scene.add(directionalLight);
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight,
      10,
    );
    this._scene.add(directionalLightHelper);

    const additionalLight = new THREE.DirectionalLight(0xffffff, 3); // 추가 조명
    additionalLight.position.set(-1, 1, 0).normalize();
    this._scene.add(additionalLight);
  }

  _setupEventListeners() {
    // 숫자 1, 2, 3, 4를 눌러 카메라 선택
    window.addEventListener('keydown', (event) => {
      this._initView();
      switch (event.key) {
        case '1':
          this._selectCamera(0, this._controls1);
          break;
        case '2':
          this._selectCamera(1, this._controls2);
          break;
        case '3':
          this._selectCamera(2, this._controls3);
          break;
        case '4':
          this._selectCamera(3, this._controls4);
          break;
      }
    });

    window.addEventListener('click', this._onMouseClick.bind(this));
  }

  _selectCamera(index, controls) {
    // 현재 선택된 카메라 업데이트
    this._selectedCamera = this._cameras[index];
    this._initView();

    // 모든 카메라의 컨트롤을 비활성화
    this._controls1.enabled = false;
    this._controls2.enabled = false;
    this._controls3.enabled = false;
    this._controls4.enabled = false;

    // 선택된 카메라의 컨트롤만 활성화
    controls.enabled = true;

    // 선택된 카메라를 제외한 나머지 카메라를 작은 화면으로 설정
    this._smallCameras = this._cameras.filter((cam, i) => i !== index);
  }

  _onMouseClick(event) {
    const rect = this._renderer.domElement.getBoundingClientRect(); // canvas의 크기와 위치를 가져옴

    // 마우스 좌표를 정규화 (NDC 좌표계로 변환)
    this._mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this._mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // 레이캐스터로 씬에서 교차하는 객체 찾기
    this._raycaster.setFromCamera(this._mouse, this._selectedCamera);
    const intersects = this._raycaster.intersectObjects(
      this._scene.children,
      true,
    );

    if (intersects.length > 0) {
      // 교차한 첫 번째 메쉬 선택
      const selectedObject = intersects[0].object;
      // this._showMeshInfo(selectedObject); // 메쉬 정보 표시
    }
  }
  // 선택된 메쉬의 정보를 표시하는 함수
  // _showMeshInfo(mesh) {
  //   const infoDiv = this._infoDiv;

  //   // 메쉬 이름과 정보를 설정
  //   infoDiv.innerHTML = `
  //           <strong>Mesh Name:</strong> ${mesh.name}<br>
  //           <strong>Position:</strong> x=${mesh.position.x.toFixed(2)}, y=${mesh.position.y.toFixed(2)}, z=${mesh.position.z.toFixed(2)}<br>
  //           <strong>Material:</strong> ${mesh.material.type}
  //       `;

  //   // 정보를 표시 (display 속성을 block으로 변경)
  //   infoDiv.style.display = 'block';
  // }

  update(time) {
    time *= 0.001; // second unit
    const deltaTime = this._clock.getDelta(); // 이전 프레임에서 경과된 시간

    if (this._mixer) {
      this._mixer.update(deltaTime);
    }

    const clipPlaneX2Flag = true;
    const clipPlaneX3Flag = true;
    const cycleTime = 36;
    const X2minConstant = 5;
    const X2maxConstant = 20;
    const X3minConstant = 290;
    const X3maxConstant = 320;

    if (clipPlaneX && clipPlaneX.constant < 300) {
      clipPlaneX.constant += deltaTime * clipSpeed * clipDirection * 10; // 속도를 조금 천천히 조정
    }
    if (clipPlaneX2) {
      if (time > 24) {
        // 17초 주기로 방향을 바꿔줌
        const timeInCycle = (time - 24) % cycleTime;
        // 0 ~ 17초 주기에서 0 ~ 8.5까지는 증가, 8.5 ~ 17은 감소
        if (timeInCycle <= cycleTime / 2) {
          if (clipPlaneX2.constant < X2maxConstant) {
            clipPlaneX2.constant += deltaTime * clipSpeed;
          }
        } else {
          if (clipPlaneX2.constant > X2minConstant) {
            clipPlaneX2.constant -= deltaTime * clipSpeed;
          }
        }
      }
    }

    if (clipPlaneX3) {
      if (time > 47) {
        // 17초 주기로 방향을 바꿔줌
        const timeInCycle = (time - 47) % cycleTime;
        // 0 ~ 17초 주기에서 0 ~ 8.5까지는 증가, 8.5 ~ 17은 감소
        if (timeInCycle <= cycleTime / 2) {
          if (clipPlaneX3.constant < X3maxConstant) {
            clipPlaneX3.constant += deltaTime * clipSpeed;
          }
        } else {
          if (clipPlaneX3.constant > X3minConstant) {
            clipPlaneX3.constant -= deltaTime * clipSpeed;
          }
        }
      }
    }

    // 시간 경과 추적
    timePassed += deltaTime;

    if (cube017Heating && timePassed >= cube017ChangeTime) {
      // 시간이 지날수록 lerpProgress 값을 0에서 1로 증가시킴
      lerpProgress = Math.min((timePassed - cube017ChangeTime) / duration, 1); // 최대 1까지
      cube017Heating.material.color.lerpColors(
        startColor,
        endColor,
        lerpProgress,
      ); // 색상 보간

      // 머티리얼 업데이트 적용
      cube017Heating.material.needsUpdate = true;
    }

    if (cubeColling && timePassed >= cubeCollingChangeTime) {
      // 시간이 지날수록 lerpProgress 값을 0에서 1로 증가시킴
      lerpProgress = Math.min(
        (timePassed - cubeCollingChangeTime) / duration,
        1,
      ); // 최대 1까지
      cubeColling.material.color.lerpColors(
        startColor,
        endCoolColor,
        lerpProgress,
      ); // 색상 보간

      // 머티리얼 업데이트 적용
      cubeColling.material.needsUpdate = true;
    }

    if (cubeColling2 && timePassed >= cubeCollingChangeTime) {
      // 시간이 지날수록 lerpProgress 값을 0에서 1로 증가시킴
      lerpProgress = Math.min(
        (timePassed - cubeCollingChangeTime) / duration,
        1,
      ); // 최대 1까지
      cubeColling2.material.color.lerpColors(
        startColor,
        endCoolColor,
        lerpProgress,
      ); // 색상 보간

      // 머티리얼 업데이트 적용
      cubeColling2.material.needsUpdate = true;
    }

    if (this._controls1.enabled && this._controls1) this._controls1.update();
    if (this._controls2.enabled && this._controls2) this._controls2.update();
    if (this._controls3.enabled && this._controls3) this._controls3.update();
    if (this._controls4.enabled && this._controls4) this._controls4.update();

    this._fps.update();
  }

  render(time) {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    const mainViewportWidth = width * 0.8; // 메인 화면 너비
    const sideViewportWidth = width * 0.2; // 오른쪽 세로 3분할 화면 너비
    const sideViewportHeight = height / 3; // 각 작은 화면의 높이

    this._renderer.setScissorTest(true);

    // 메인 화면 렌더링
    this._renderer.setViewport(0, 0, mainViewportWidth, height);
    this._renderer.setScissor(0, 0, mainViewportWidth, height);
    this._renderer.render(this._scene, this._selectedCamera); // 선택된 카메라로 메인 화면 렌더링

    //나머지 카메라들을 오른쪽 작은 화면에 렌더링
    for (let i = 0; i < this._smallCameras.length; i++) {
      this._renderer.setViewport(
        mainViewportWidth,
        sideViewportHeight * (2 - i),
        sideViewportWidth,
        sideViewportHeight,
      );
      this._renderer.setScissor(
        mainViewportWidth,
        sideViewportHeight * (2 - i),
        sideViewportWidth,
        sideViewportHeight,
      );
      this._renderer.render(this._scene, this._smallCameras[i]);
    }

    this._renderer.setScissorTest(false);

    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }
  resize() {
    const width = this._divContainer.clientWidth;
    const height = this._divContainer.clientHeight;

    this._camera1.aspect = width / height;
    this._camera2.aspect = width / height;
    this._camera3.aspect = width / height;
    this._camera4.aspect = width / height;

    this._camera1.updateProjectionMatrix();
    this._camera2.updateProjectionMatrix();
    this._camera3.updateProjectionMatrix();
    this._camera4.updateProjectionMatrix();

    this._renderer.setSize(width, height);
  }
}

const ThreeDMonitoring = () => {
  useEffect(() => {
    new App();
    /*
    // Factory.js 파일을 동적으로 로드
    const script = document.createElement('script');
    script.src = `${window.location.origin}/js/Factory.js`; // Factory.js가 public/js에 위치
    script.type = 'module'; // 모듈로 선언
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // JS 파일 로드 후 App 클래스를 실행
    script.onload = () => {
      if (window.App) {
        new window.App(); // App 클래스를 전역에서 호출
      }
    };

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
    */
  }, []);

  return (
    <div className={styles.page}>
      <h1>3D 모니터링 작업 화면</h1>
      <div id="webgl-container" style={{ width: '100%', height: '100vh' }}>
        here!!!!
      </div>
    </div>
  );
};
export default ThreeDMonitoring;
