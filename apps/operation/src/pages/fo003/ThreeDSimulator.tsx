import { Table } from '@postcoil/ui';
import { ColumnDataType, DataType } from '@postcoil/ui/config/TableConfig';
// import { Client } from '@stomp/stompjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
import * as THREE from 'three';
import { PMREMGenerator } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// import ContentContainer from './component/ContentContainer';
import styles from './ThreeDSimulation.module.scss';

let clipPlaneX: any;
let clipPlaneX2: any;
let clipPlaneX3: any;

const clipSpeed: number = 11.5;
const clipDirection: number = 1;

let cube017Heating: any = null;
let timePassed: number = 0;
const cube017ChangeTime: number = 8;

let cubeColling: any = null;
let cubeColling2: any = null;
const cubeCollingChangeTime: number = 14.5;

const duration: number = 1;
const startColor: any = new THREE.Color(0x000000);
const endColor: any = new THREE.Color(0xff0000);
let lerpProgress: number = 0;

const endCoolColor = new THREE.Color(0x0000ff);

class App {
  private divContainer: HTMLDivElement | null;
  private infoDiv: HTMLDivElement | null; // 선택된 메쉬 정보를 표시할 div
  private cameras: THREE.PerspectiveCamera[];
  private smallCameras: THREE.PerspectiveCamera[];
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private clock: THREE.Clock;
  private fps!: Stats;
  private mixer: THREE.AnimationMixer | null = null;
  private selectedCamera!: THREE.PerspectiveCamera;
  private camera1!: THREE.PerspectiveCamera;
  private camera2!: THREE.PerspectiveCamera;
  private camera3!: THREE.PerspectiveCamera;
  private camera4!: THREE.PerspectiveCamera;
  private controls1!: OrbitControls;
  private controls2!: OrbitControls;
  private controls3!: OrbitControls;
  private controls4!: OrbitControls;
  // private boxHelper: THREE.BoxHelper | null = null;
  // private model: THREE.Object3D | null = null;
  // private box: THREE.Box3 | null = null;
  // private selectedMeshInfo: string = ''; // 클릭된 메쉬 정보를 저장

  private defaultTimeScale = 1; // 기본 속도
  private expectedDurationTimeScale = 1; // 애니메이션 속도
  private isExpectedDurationActive = false; // expectedDuration이 활성화 되었는지 여부
  private expectedDurationElapsedTime = 0; // elapsed time tracker
  private expectedDuration: number = 0; // 전달된 expectedDuration 값을 저장할 변수
  // private controls: any;
  // private schCoils: THREE.Object3D[] = [];

  constructor(coilItems: any[]) {
    this.divContainer = document.querySelector('#webgl-container');
    this.infoDiv = document.querySelector('#mesh-info'); // 선택된 Mesh 정보를 표시할 div 선택
    this.cameras = [];
    this.smallCameras = [];
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    this.divContainer?.appendChild(renderer.domElement);

    this.renderer = renderer;

    const scene = new THREE.Scene();
    this.scene = scene;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    window.addEventListener('click', this.onMouseClick.bind(this));
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera1.aspect = window.innerWidth / window.innerHeight;
      this.camera1.updateProjectionMatrix();
    });

    this.setupCamera();
    this.setupModel(coilItems);
    this.setupControls();
    this.setupEventListeners();
    this.setupEnvironmentMap();
    this.setupLight();

    this.clock = new THREE.Clock();
    window.onresize = this.resize.bind(this);
    this.resize();

    requestAnimationFrame(this.render.bind(this));
  }

  // 선택된 메쉬 정보를 표시하는 함수
  private showMeshInfo(mesh: THREE.Mesh) {
    if (this.infoDiv) {
      // 메쉬 정보 업데이트
      this.infoDiv.innerHTML = `
        <strong>Mesh Name:</strong> ${mesh.name}<br>
        <strong>Position:</strong> x=${mesh.position.x.toFixed(2)}, y=${mesh.position.y.toFixed(2)}, z=${mesh.position.z.toFixed(2)}<br>
        <strong>Material:</strong> ${mesh.material}
      `;
      this.infoDiv.style.display = 'block'; // 정보를 화면에 표시
    }
  }

  private onMouseClick(event: MouseEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();

    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.selectedCamera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true,
    );

    if (intersects.length > 0) {
      const selectedObject = intersects[0].object as THREE.Mesh;
      this.showMeshInfo(selectedObject); // 선택된 메쉬 정보를 보여줌
    }
  }

  private setupEnvironmentMap() {
    const pmremGenerator = new PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader().load('image20.hdr', (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      this.scene.environment = envMap;
      this.scene.background = new THREE.Color(0xebfff5);
      texture.dispose();
      pmremGenerator.dispose();
    });
  }

  private initView() {
    this.controls1.target = new THREE.Vector3(15, 0, 0);
    this.controls1.update();
    this.controls2.target = new THREE.Vector3(100, 0, 0);
    this.controls2.update();
    this.controls3.target = new THREE.Vector3(210, 0, 0);
    this.controls3.update();
    this.controls4.target = new THREE.Vector3(300, 0, 0);
    this.controls4.update();
  }

  private setupControls() {
    this.controls1 = new OrbitControls(this.camera1, this.divContainer!);
    this.controls2 = new OrbitControls(this.camera2, this.divContainer!);
    this.controls3 = new OrbitControls(this.camera3, this.divContainer!);
    this.controls4 = new OrbitControls(this.camera4, this.divContainer!);

    this.initView();
    this.controls1.enabled = false;
    this.controls2.enabled = false;
    this.controls3.enabled = false;
    this.controls4.enabled = false;

    // const stats = new Stats();
    // this.divContainer?.appendChild(stats.dom);
    // this.fps = stats;
  }

  private setupModel(coilItems: any[]) {
    new GLTFLoader().load('./postco.glb', (gltf) => {
      const model = gltf.scene;
      this.scene.add(model);

      const numCoils = coilItems.length;

      // 1. Handle 'SchCoil' objects (SchCoil1, SchCoil2, ...)
      const schCoils = []; // Array to store SchCoil objects
      for (let i = 1; i <= 8; i++) {
        const coil = model.getObjectByName(`SchCoil${i}`);
        if (coil) {
          schCoils.push(coil);
        }
      }
      const subCoils = []; // Array to store subCoil objects
      for (let i = 6; i <= 39; i++) {
        const subCoilName = i < 10 ? `subcoil00${i}` : `subcoil0${i}`;
        const subCoil = model.getObjectByName(subCoilName);
        if (subCoil) {
          subCoils.push(subCoil);
        }
      }
      schCoils.forEach((coil, index) => {
        coil.visible = index < numCoils; // Show up to numCoils SchCoils, hide the rest
      });
      // subCoils 처리
      // 초과된 코일을 subCoils로 표시 (numCoils가 schCoils의 개수를 초과할 경우)
      if (numCoils > schCoils.length) {
        const extraCoils = numCoils - schCoils.length; // 초과된 코일 수

        subCoils.forEach((subCoil, index) => {
          subCoil.visible = index < extraCoils; // 필요한 수만큼 subCoil 표시
        });
      } else {
        subCoils.forEach((subCoil) => {
          subCoil.visible = false; // schCoils에서만 다 처리되는 경우 subCoils는 숨김
        });
      }

      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.computeVertexNormals();
          child.material.side = THREE.DoubleSide;

          if (child.material.map) {
            child.material = new THREE.MeshStandardMaterial({
              map: child.material.map,
              metalness: child.material.metalness,
              roughness: child.material.roughness,
              envMap: this.scene.environment,
              envMapIntensity: 1,
              side: THREE.DoubleSide,
            });
          }
          // else {
          //   child.material = new THREE.MeshBasicMaterial({
          //     color: child.material.color || 0xffffff,
          //     side: THREE.DoubleSide,
          //   });
          // }

          if (child.name === 'Plane001') {
            console.log('find!');
            // 바닥 Mesh에 대한 특수 처리
            child.material = new THREE.MeshStandardMaterial({
              color: 0x000000, // 바닥의 색상을 명시적으로 설정
              emissive: 0xf0f0f0,
              emissiveIntensity: 0.6,
              roughness: 0.8,
              metalness: 0,
              side: THREE.DoubleSide, // 양면 렌더링
            });
          }

          if (child.name === 'Plane') {
            clipPlaneX = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 8);
            child.material.clippingPlanes = [clipPlaneX];
            child.material.clipShadows = true;

            // const planeHelper = new THREE.PlaneHelper(
            //   clipPlaneX,
            //   200,
            //   0xff0000,
            // );
            // this.scene.add(planeHelper);
          }
          if (child.name === 'Plane002') {
            // 클리핑 플레인 설정 (X축 기준으로 왼쪽에서부터 메쉬를 잘라냄)
            clipPlaneX2 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0); // X축 방향으로 왼쪽에서 시작
            child.material.clippingPlanes = [clipPlaneX2]; // 메쉬에 클리핑 플레인 적용
            child.material.clipShadows = true; // 그림자에도 클리핑 플레인을 적용

            // const planeHelper2 = new THREE.PlaneHelper(
            //   clipPlaneX2,
            //   200,
            //   0xff0000,
            // ); // 클리핑 플레인을 시각적으로 확인
            // //this.scene.add(planeHelper2);
          }
          if (child.name === 'Plane003') {
            // 클리핑 플레인 설정 (X축 기준으로 왼쪽에서부터 메쉬를 잘라냄)
            clipPlaneX3 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 290); // X축 방향으로 왼쪽에서 시작
            child.material.clippingPlanes = [clipPlaneX3]; // 메쉬에 클리핑 플레인 적용
            child.material.clipShadows = true; // 그림자에도 클리핑 플레인을 적용

            // const planeHelper3 = new THREE.PlaneHelper(
            //   clipPlaneX3,
            //   200,
            //   0xff0000,
            // ); // 클리핑 플레인을 시각적으로 확인
            // this.scene.add(planeHelper3);
          }

          if (child.name === 'Cube017') {
            cube017Heating = child;
          }

          if (child.name === 'Cube') {
            cubeColling = child;
          }
          if (child.name === 'Cube008') {
            cubeColling2 = child;
          }
        }
      });

      this.mixer = new THREE.AnimationMixer(model);

      const animations = gltf.animations;
      if (animations && animations.length) {
        const action = this.mixer.clipAction(animations[0]);
        action.play();
      }
      if (coilItems.length > 0) {
        this.expectedDuration = coilItems[0].expectedDuration || 1; // 첫 번째 아이템의 expectedDuration
        this.adjustAnimationSpeed(this.expectedDuration);
      }
      this.renderer.localClippingEnabled = true;

      console.log(gltf.animations);
    });
  }

  private setupCamera() {
    this.camera1 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    this.camera1.position.set(0, 30, 30);

    this.camera2 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    this.camera2.position.set(70, 50, 50);

    this.camera3 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    this.camera3.position.set(250, 50, 50);

    this.camera4 = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      5000,
    );
    this.camera4.position.set(330, 30, 40);

    this.cameras = [this.camera1, this.camera2, this.camera3, this.camera4];
    this.selectedCamera = this.camera1;
    this.smallCameras = [this.camera2, this.camera3, this.camera4];
  }

  private addPointLight(x: number, y: number, z: number) {
    const color = 0xffffff;
    const intensity = 2;
    const pointLight = new THREE.PointLight(color, intensity, 2000);
    pointLight.position.set(x, y, z);
    this.scene.add(pointLight);

    // const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
    // this.scene.add(pointLightHelper);
  }

  private setupLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 8);
    this.scene.add(ambientLight);
    this.addPointLight(350, 30, 50);
    this.addPointLight(-10, 30, 50);
    this.addPointLight(-10, 30, -80);
    this.addPointLight(350, 30, -80);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(150, 30, 50).normalize();
    this.scene.add(directionalLight);
    // const directionalLightHelper = new THREE.DirectionalLightHelper(
    //   directionalLight,
    //   10,
    // );
    // this.scene.add(directionalLightHelper);

    const additionalLight = new THREE.DirectionalLight(0xffffff, 10);
    additionalLight.position.set(-1, 1, 0).normalize();
    this.scene.add(additionalLight);
  }

  private setupEventListeners() {
    window.addEventListener('keydown', (event) => {
      this.initView();
      switch (event.key) {
        case '1':
          this.selectCamera(0, this.controls1);
          break;
        case '2':
          this.selectCamera(1, this.controls2);
          break;
        case '3':
          this.selectCamera(2, this.controls3);
          break;
        case '4':
          this.selectCamera(3, this.controls4);
          break;
      }
    });

    window.addEventListener('click', this.onMouseClick.bind(this));
  }

  private selectCamera(index: number, controls: OrbitControls) {
    this.selectedCamera = this.cameras[index];
    this.initView();

    this.controls1.enabled = false;
    this.controls2.enabled = false;
    this.controls3.enabled = false;
    this.controls4.enabled = false;

    controls.enabled = true;
    this.smallCameras = this.cameras.filter((_, i) => i !== index);
  }

  // ****************** 애니메이션 속도 조절 부분
  private adjustAnimationSpeed(expectedDuration: number) {
    if (this.mixer) {
      this.isExpectedDurationActive = true;
      this.expectedDurationElapsedTime = 0; // 시간을 0으로 초기화

      // expectedDuration 값에 따라 timeScale 변경
      this.expectedDurationTimeScale = this.defaultTimeScale / expectedDuration;
      this.mixer.timeScale = this.expectedDurationTimeScale;

      setTimeout(() => {
        // expectedDuration이 지나면 기본 속도로 복구
        this.resetAnimationSpeed();
      }, expectedDuration * 1000); // 밀리초로 변환하여 사용
    }
  }

  private resetAnimationSpeed() {
    if (this.mixer) {
      this.mixer.timeScale = this.defaultTimeScale;
      this.isExpectedDurationActive = false;
    }
  }
  update(time: number) {
    time *= 0.001;
    const deltaTime = this.clock.getDelta() / 2;
    time += 1;
    if (this.mixer) {
      this.mixer.update(deltaTime);
    }

    // expectedDuration이 진행 중이면 경과 시간을 업데이트
    if (this.isExpectedDurationActive) {
      this.expectedDurationElapsedTime += deltaTime;
      if (this.expectedDurationElapsedTime >= this.expectedDuration) {
        // expectedDuration 시간이 지나면 기본 속도로 변경
        this.resetAnimationSpeed();
      }
    }

    if (clipPlaneX && clipPlaneX.constant < 300) {
      clipPlaneX.constant += deltaTime * clipSpeed * clipDirection;
    }

    if (clipPlaneX2 && time > 21) {
      const timeInCycle = (time - 21) % 40;
      if (timeInCycle <= 21 && clipPlaneX2.constant < 20) {
        clipPlaneX2.constant += deltaTime * clipSpeed;
      } else if (clipPlaneX2.constant > 5) {
        clipPlaneX2.constant -= deltaTime * clipSpeed;
      }
    }

    if (clipPlaneX3 && time > 44) {
      const timeInCycle = (time - 44) % 40;
      if (timeInCycle <= 20 && clipPlaneX3.constant < 320) {
        clipPlaneX3.constant += deltaTime * clipSpeed;
      } else if (clipPlaneX3.constant > 290) {
        clipPlaneX3.constant -= deltaTime * clipSpeed;
      }
    }

    timePassed += deltaTime;

    if (cube017Heating && timePassed >= cube017ChangeTime) {
      lerpProgress = Math.min((timePassed - cube017ChangeTime) / duration, 1);
      cube017Heating.material.color.lerpColors(
        startColor,
        endColor,
        lerpProgress,
      );
      cube017Heating.material.needsUpdate = true;
    }

    if (cubeColling && timePassed >= cubeCollingChangeTime) {
      lerpProgress = Math.min(
        (timePassed - cubeCollingChangeTime) / duration,
        1,
      );
      cubeColling.material.color.lerpColors(
        startColor,
        endCoolColor,
        lerpProgress,
      );
      cubeColling.material.needsUpdate = true;
    }

    if (cubeColling2 && timePassed >= cubeCollingChangeTime) {
      lerpProgress = Math.min(
        (timePassed - cubeCollingChangeTime) / duration,
        1,
      );
      cubeColling2.material.color.lerpColors(
        startColor,
        endCoolColor,
        lerpProgress,
      );
      cubeColling2.material.needsUpdate = true;
    }

    if (this.controls1.enabled) this.controls1.update();
    if (this.controls2.enabled) this.controls2.update();
    if (this.controls3.enabled) this.controls3.update();
    if (this.controls4.enabled) this.controls4.update();

    // this.fps.update();
  }

  render(time: number) {
    const width = this.divContainer!.clientWidth;
    const height = this.divContainer!.clientHeight;

    const mainViewportWidth = width * 0.8;
    const sideViewportWidth = width * 0.2;
    const sideViewportHeight = height / 3;

    this.renderer.setScissorTest(true);

    this.renderer.setViewport(0, 0, mainViewportWidth, height);
    this.renderer.setScissor(0, 0, mainViewportWidth, height);
    this.renderer.render(this.scene, this.selectedCamera);

    for (let i = 0; i < this.smallCameras.length; i++) {
      this.renderer.setViewport(
        mainViewportWidth,
        sideViewportHeight * (2 - i),
        sideViewportWidth,
        sideViewportHeight,
      );
      this.renderer.setScissor(
        mainViewportWidth,
        sideViewportHeight * (2 - i),
        sideViewportWidth,
        sideViewportHeight,
      );
      this.renderer.render(this.scene, this.smallCameras[i]);
    }

    this.renderer.setScissorTest(false);
    this.update(time);
    requestAnimationFrame(this.render.bind(this));
  }

  resize() {
    const width = this.divContainer!.clientWidth;
    const height = this.divContainer!.clientHeight;

    this.camera1.aspect = width / height;
    this.camera2.aspect = width / height;
    this.camera3.aspect = width / height;
    this.camera4.aspect = width / height;

    this.camera1.updateProjectionMatrix();
    this.camera2.updateProjectionMatrix();
    this.camera3.updateProjectionMatrix();
    this.camera4.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}

interface WorkInstruction extends DataType {
  scheduleId: number;
  scheduleNo: string;
  process: string;
  rollUnit: string;
  totalQuantity: number;
  expectedDuration: number;
  schStatus: string;
}

interface WorkInstructionItem extends DataType {
  itemId: number;
  expectedItemDuration: number;
}
const ThreeDSimulator = () => {
  const [workInstructions, setWorkInstructions] = useState<WorkInstruction[]>(
    [],
  );
  const [selectedItems, setSelectedItems] = useState<WorkInstructionItem[]>([]); // 선택된 아이템 상태 추가

  const [loading, setLoading] = useState(true);

  // API 호출 함수
  const fetchWorkInstructions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_OPERATION_API_URL}${import.meta.env.VITE_WORK_INSTRUCTIONS_BASE_URL}/pending-schedule`,
        {},
      );

      const { result } = response.data;

      const simplifiedData = result.map(
        (item: WorkInstruction): Record<string, any> => ({
          scheduleId: item.scheduleId,
          scheduleNo: item.scheduleNo,
          process: item.process,
          rollUnit: item.rollUnit,
          totalQuantity: item.totalQuantity,
          expectedDuration: item.expectedDuration,
          schStatus: item.schStatus,
        }),
      );

      setWorkInstructions(simplifiedData);
    } catch (error) {
      console.error('Error fetching work instructions:', error);
    } finally {
      setLoading(false);
    }
  };
  // 작업 아이템 데이터를 가져오는 함수
  const fetchWorkInstructionItems = async (scheduleId: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_OPERATION_API_URL}${import.meta.env.VITE_WORK_INSTRUCTIONS_BASE_URL}-items/get-items?workInstructionId=${scheduleId}`,
      );

      const { result } = response.data;
      const coilData = result.map(
        (item: WorkInstructionItem): Record<string, any> => ({
          itemId: item.sequence,
          expectedItemDuration: item.expectedItemDuration,
        }),
      );
      console.log('Selected items:', result);
      setSelectedItems(coilData);

      // 이전 WebGL 컨테이너를 삭제하고 새로운 App 초기화
      const container = document.querySelector('#webgl-container');
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild); // 기존의 내용을 모두 제거
        }
      }
      new App(result);
    } catch (error) {
      console.error('Error fetching work instruction items:', error);
    }
  };

  useEffect(() => {
    // Initialize the 3D App
    const container = document.querySelector('#webgl-container');
    if (container && container.children.length === 0) {
      new App([]);
    }
    fetchWorkInstructions();
  }, []);

  const columnsData: ColumnDataType<WorkInstruction>[] = [
    {
      title: '작업지시서 ID',
      dataIndex: 'scheduleId',
      key: 'scheduleId',
      sortable: true,
    },
    {
      title: '스케쥴 NO',
      dataIndex: 'scheduleNo',
      key: 'scheduleNo',
      sortable: true,
    },
    {
      title: '공정',
      dataIndex: 'process',
      key: 'process',
    },
    {
      title: '롤 단위',
      dataIndex: 'rollUnit',
      key: 'rollUnit',
    },
    {
      title: '전체 코일 개수',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: '예상시간',
      dataIndex: 'expectedDuration',
      key: 'expectedDuration',
    },
    {
      title: '작업상태',
      dataIndex: 'schStatus',
      key: 'schStatus',
    },
  ];

  const coilsData: ColumnDataType<WorkInstructionItem>[] = [
    {
      title: '코일 ID',
      dataIndex: 'itemId',
      key: 'itemId',
    },
    {
      title: '예상시간',
      dataIndex: 'expectedItemDuration',
      key: 'expectedItemDuration',
    },
  ];
  // row 클릭 이벤트 핸들러를 위한 추가 코드
  const handleRowClick = (record: WorkInstruction) => {
    // scheduleId를 이용하여 API 호출
    fetchWorkInstructionItems(record.scheduleId);
  };

  return (
    <div className={styles.page}>
      <h1>3D 시뮬레이션</h1>
      <div
        id="webgl-container"
        style={{ width: '95%', height: '120%', position: 'relative' }}></div>
      <h3>작업 지시서 리스트</h3>

      <div className={styles.tableContainer}>
        {/* 테이블을 감싸는 Flexbox 컨테이너 */}
        <div className={styles.schtable}>
          <div className={styles.summary}>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Table<WorkInstruction>
                columns={columnsData}
                data={workInstructions}
                rowKey="scheduleId"
                useCheckBox={false}
                pagination={false}
                handleRowClick={handleRowClick} // handleRowClick 전달
              />
            )}
          </div>
        </div>
        {/* 옆에 선택된 작업 아이템을 보여주는 테이블 */}
        <div className={styles.selectedItemsTable}>
          <h2>코일 리스트</h2>
          {selectedItems.length > 0 ? (
            <Table<WorkInstructionItem>
              columns={coilsData}
              data={selectedItems}
              rowKey="itemId"
              pagination={false}
            />
          ) : (
            <p>아이템을 선택하세요.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreeDSimulator;
