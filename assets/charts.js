(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // Color palette
  var palette = [accent, accent2, '#dc2626', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

  // --- Chart 1: Domestic Policy Trend ---
  var chart1 = echarts.init(document.getElementById('chart-domestic-trend'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { data: ['国家政策', '地方政策', '标准规范'], bottom: 0, textStyle: { color: muted } },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2024Q1', '2024Q2', '2024Q3', '2024Q4', '2025Q1', '2025Q2', '2025Q3', '2025Q4', '2026Q1', '2026Q2', '2026Q3'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    yAxis: {
      type: 'value',
      name: '政策数量',
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '国家政策',
        type: 'line',
        data: [2, 3, 2, 4, 3, 4, 3, 5, 4, 5, 6],
        smooth: true,
        lineStyle: { color: accent, width: 3 },
        itemStyle: { color: accent },
        areaStyle: { color: accent + '20' }
      },
      {
        name: '地方政策',
        type: 'line',
        data: [3, 4, 5, 6, 5, 7, 8, 9, 8, 10, 12],
        smooth: true,
        lineStyle: { color: accent2, width: 3 },
        itemStyle: { color: accent2 },
        areaStyle: { color: accent2 + '20' }
      },
      {
        name: '标准规范',
        type: 'line',
        data: [1, 2, 1, 3, 2, 3, 2, 4, 3, 4, 5],
        smooth: true,
        lineStyle: { color: '#dc2626', width: 3 },
        itemStyle: { color: '#dc2626' },
        areaStyle: { color: '#dc262620' }
      }
    ]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // --- Chart 2: Heatmap Comparison ---
  var chart2 = echarts.init(document.getElementById('chart-heatmap'), null, { renderer: 'svg' });
  var heatmapData = [
    [0, 0, 95], [1, 0, 85], [2, 0, 90], [3, 0, 75], [4, 0, 80],
    [0, 1, 70], [1, 1, 95], [2, 1, 60], [3, 1, 85], [4, 1, 70],
    [0, 2, 80], [1, 2, 75], [2, 2, 95], [3, 2, 65], [4, 2, 75],
    [0, 3, 60], [1, 3, 70], [2, 3, 75], [3, 3, 95], [4, 3, 80],
    [0, 4, 75], [1, 4, 80], [2, 4, 70], [3, 4, 85], [4, 4, 95]
  ];
  var xData = ['国内', '欧盟', '新加坡', '日本', '韩国'];
  var yData = ['一网统管/平台', '数字孪生/CIM', 'AIoT/边缘计算', '网络安全', '开放数据/互操作'];
  chart2.setOption({
    animation: false,
    tooltip: { position: 'top', appendToBody: true },
    grid: { left: '15%', right: '10%', bottom: '15%', top: '5%' },
    xAxis: { type: 'category', data: xData, splitArea: { show: false }, axisLabel: { color: muted } },
    yAxis: { type: 'category', data: yData, splitArea: { show: false }, axisLabel: { color: muted } },
    visualMap: {
      min: 50, max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '0%',
      inRange: { color: [bg2, '#93c5fd', accent] },
      textStyle: { color: muted }
    },
    series: [{
      name: '关注度',
      type: 'heatmap',
      data: heatmapData,
      label: { show: true, color: ink, formatter: function(p) { return p.value[2] + '%'; } },
      itemStyle: { borderColor: bg2, borderWidth: 2 }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // --- Chart 3: Domestic Core Areas Pie ---
  var chart3 = echarts.init(document.getElementById('chart-domestic-pie'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: { orient: 'vertical', left: 'left', textStyle: { color: muted } },
    series: [{
      name: '核心领域',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 8, borderColor: bg2, borderWidth: 2 },
      label: { show: true, color: ink, formatter: '{b}\n{d}%' },
      data: [
        { value: 28, name: '城市生命线安全', itemStyle: { color: accent } },
        { value: 22, name: '一网统管平台', itemStyle: { color: accent2 } },
        { value: 18, name: '物联感知监测', itemStyle: { color: '#dc2626' } },
        { value: 15, name: '城市体检评估', itemStyle: { color: '#f59e0b' } },
        { value: 10, name: '数据汇聚共享', itemStyle: { color: '#8b5cf6' } },
        { value: 7, name: '标准规范建设', itemStyle: { color: '#ec4899' } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // --- Chart 4: International Tech Deployment Pie ---
  var chart4 = echarts.init(document.getElementById('chart-international-pie'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true },
    legend: { orient: 'vertical', left: 'left', textStyle: { color: muted } },
    series: [{
      name: '技术部署',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 8, borderColor: bg2, borderWidth: 2 },
      label: { show: true, color: ink, formatter: '{b}\n{d}%' },
      data: [
        { value: 25, name: 'Digital Twin/CIM', itemStyle: { color: accent } },
        { value: 22, name: 'AI/ML分析', itemStyle: { color: accent2 } },
        { value: 18, name: 'IoT传感器网络', itemStyle: { color: '#dc2626' } },
        { value: 15, name: '5G/6G通信', itemStyle: { color: '#f59e0b' } },
        { value: 12, name: '网络安全', itemStyle: { color: '#8b5cf6' } },
        { value: 8, name: '开放数据平台', itemStyle: { color: '#06b6d4' } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart4.resize(); });

  // --- Chart 5: Radar Comparison ---
  var chart5 = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  chart5.setOption({
    animation: false,
    tooltip: { appendToBody: true },
    legend: { data: ['国内', '国外'], bottom: 0, textStyle: { color: muted } },
    radar: {
      indicator: [
        { name: '顶层设计', max: 100 },
        { name: '标准规范', max: 100 },
        { name: '技术创新', max: 100 },
        { name: '数据开放', max: 100 },
        { name: '网络安全', max: 100 },
        { name: '国际合作', max: 100 }
      ],
      axisName: { color: muted },
      splitArea: { areaStyle: { color: [bg2, bg2] } },
      axisLine: { lineStyle: { color: rule } },
      splitLine: { lineStyle: { color: rule } }
    },
    series: [{
      name: '发展阶段对比',
      type: 'radar',
      data: [
        {
          value: [90, 85, 70, 60, 75, 55],
          name: '国内',
          areaStyle: { color: accent + '30' },
          lineStyle: { color: accent, width: 2 },
          itemStyle: { color: accent }
        },
        {
          value: [70, 80, 90, 85, 90, 85],
          name: '国外',
          areaStyle: { color: accent2 + '30' },
          lineStyle: { color: accent2, width: 2 },
          itemStyle: { color: accent2 }
        }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart5.resize(); });

  // --- Chart 6: Policy Type Distribution ---
  var chart6 = echarts.init(document.getElementById('chart-policy-type'), null, { renderer: 'svg' });
  chart6.setOption({
    animation: false,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true },
    legend: { data: ['国内', '国外'], bottom: 0, textStyle: { color: muted } },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['国家标准', '地方政策', '行业规范', '国际标准', '国家/地区政策', '技术指南'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, rotate: 15 }
    },
    yAxis: {
      type: 'value',
      name: '数量',
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '国内',
        type: 'bar',
        data: [3, 4, 3, 0, 0, 0],
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '国外',
        type: 'bar',
        data: [0, 0, 0, 2, 4, 2],
        itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] }
      }
    ]
  });
  window.addEventListener('resize', function() { chart6.resize(); });

  // --- Chart 7: Keyword Bar Chart ---
  var chart7 = echarts.init(document.getElementById('chart-keyword-bar'), null, { renderer: 'svg' });
  chart7.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    grid: { left: '3%', right: '8%', bottom: '5%', top: '5%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: ['开放数据', '边缘计算', '数字孪生', 'AI分析', '物联感知', '一网统管', '城市生命线'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted }
    },
    series: [{
      name: '热度指数',
      type: 'bar',
      data: [
        { value: 72, itemStyle: { color: '#8b5cf6' } },
        { value: 78, itemStyle: { color: '#f59e0b' } },
        { value: 85, itemStyle: { color: '#dc2626' } },
        { value: 88, itemStyle: { color: '#ec4899' } },
        { value: 92, itemStyle: { color: accent2 } },
        { value: 95, itemStyle: { color: accent } },
        { value: 98, itemStyle: { color: '#059669' } }
      ],
      label: { show: true, position: 'right', color: ink, formatter: '{c}' },
      itemStyle: { borderRadius: [0, 4, 4, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart7.resize(); });

})();
