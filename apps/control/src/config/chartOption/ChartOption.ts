import * as echarts from 'echarts';

export const treemapData = [
  { name: 'Max Flow Min Cut', value: 7840 },
  { name: 'Link Distance', value: 5731 },
  { name: 'Shortest Paths', value: 5914 },
  { name: 'Betweenness Centrality', value: 3534 },
  { name: 'Spanning Tree', value: 3416 },
  { name: 'Hierarchical Cluster', value: 6714 },
  { name: 'Aspect Ratio Banker', value: 7074 },
  { name: 'Agglomeration Cluster', value: 3938 },
  { name: 'Community Structure', value: 3812 },
];

treemapData.sort(function (a, b) {
  return a.value - b.value;
});

export const treemapOption: echarts.EChartsOption = {
  series: [
    {
      type: 'treemap',
      data: treemapData.map((item, index) => ({
        name: item.name,
        value: item.value,
        itemStyle: {
          // 색상 지정 후 하나씩 가져오기
          color: [
            '#FFADAD',
            '#FFD6A5',
            '#FDFFB6',
            '#CAFFBF',
            '#9BF6FF',
            '#A0C4FF',
            '#BDB2FF',
            '#FFC6FF',
            '#FFFFFC',
          ][8 - (index % 9)],
        },
      })),
      label: {
        color: 'black',
        fontWeight: 'bolder',
      },
      emphasis: {
        itemStyle: {
          // hover시 배경화면
          color: 'white',
        },
        label: {
          show: true,
          // 해당 표에 손을 놓으면 개수 표시
          formatter: function (graph) {
            return `${graph.name} : ${graph.value} 개`;
          },
        },
      },
      roam: false, // 확대 기능 사용안함
      nodeClick: false, // 클릭시 표 움직이는 기능 사용안함
      universalTransition: true,
    },
  ],
};
export const barOption: echarts.EChartsOption = {
  xAxis: {
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: treemapData.map((item) => item.name),
  },
  series: [
    {
      type: 'bar',
      data: treemapData.map((item) => item.value),
      universalTransition: true,
    },
  ],
};
