<template>
  <div id="vizContainer" style="width: 100%; height: 100%">
    <!--    <iframe style="width: 100%; height: 100%;" src="http://localhost:7474/browser/" />-->
  </div>
</template>

<script>

import NeoVis from 'neovis.js'

export default {
  name: 'NeoVisGraph',
  mounted() {
    const config = {
      containerId: 'vizContainer',
      neo4j: {
        serverUrl: 'bolt://gpu2.csubot.cn:17687',
        serverUser: 'neo4j',
        serverPassword: 'password'
      },
      labels: {
        ID: {
          label: 'name',
          value: 'pagerank'
        },
        '基本属性': {
          label: 'name',
          value: 'pagerank'
        },
        '图书馆调研': {
          label: 'name',
          value: 'pagerank'
        },
        '年级': {
          label: 'name',
          value: 'pagerank'
        },
        '投入程度': {
          label: 'name',
          value: 'pagerank'
        },
        '智慧图书馆期待程度': {
          label: 'name',
          value: 'pagerank'
        },
        '理解能力': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读习惯': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读能力': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读偏好': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读需求': {
          label: 'name',
          value: 'pagerank'
        },
        '性别': {
          label: 'name',
          value: 'pagerank'
        },
        '专注程度': {
          label: 'name',
          value: 'pagerank'
        },
        '亲子阅读': {
          label: 'name',
          value: 'pagerank'
        },
        '儿童阅读画像': {
          label: 'name',
          value: 'pagerank'
        },
        '兴趣原因': {
          label: 'name',
          value: 'pagerank'
        },
        '内容记忆': {
          label: 'name',
          value: 'pagerank'
        },
        '图书介质': {
          label: 'name',
          value: 'pagerank'
        },
        '图书体裁': {
          label: 'name',
          value: 'pagerank'
        },
        '图书馆频率': {
          label: 'name',
          value: 'pagerank'
        },
        '图片理解': {
          label: 'name',
          value: 'pagerank'
        },
        '多模态图书资源库': {
          label: 'name',
          value: 'pagerank'
        },
        '年龄': {
          label: 'name',
          value: 'pagerank'
        },
        '故事理解': {
          label: 'name',
          value: 'pagerank'
        },
        '数字资源满意度': {
          label: 'name',
          value: 'pagerank'
        },
        '是否借助拼音': {
          label: 'name',
          value: 'pagerank'
        },
        '最喜欢的书': {
          label: 'name',
          value: 'pagerank'
        },
        '有声书': {
          label: 'name',
          value: 'pagerank'
        },
        '篇幅': {
          label: 'name',
          value: 'pagerank'

        },
        '纸质书': {
          label: 'name',
          value: 'pagerank'
        },
        '纸质图书满意度': {
          label: 'name',
          value: 'pagerank'
        },
        '绘本': {
          label: 'name',
          value: 'pagerank'
        },
        '语言表达': {
          label: 'name',
          value: 'pagerank'
        },
        '读物来源': {
          label: 'name',
          value: 'pagerank'
        },
        '购买决定': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读分享': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读困难': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读姿势': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读工具': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读数量': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读方式': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读时长': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读氛围满意度': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读目的': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读计划': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读顺序': {
          label: 'name',
          value: 'pagerank'
        },
        '阅读频率': {
          label: 'name',
          value: 'pagerank'
        }
      },
      relationships: {
        '专注程度': { caption: true, thickness: 'value' },
        '亲子阅读': { caption: true, thickness: 'value' },
        '兴趣原因': { caption: true, thickness: 'value' },
        '内容记忆': { caption: true, thickness: 'value' },
        '图书介质': { caption: true, thickness: 'value' },
        '图书体裁': { caption: true, thickness: 'value' },
        '图书馆频率': { caption: true, thickness: 'value' },
        '图片理解': { caption: true, thickness: 'value' },
        '年级': { caption: true, thickness: 'value' },
        '年龄': { caption: true, thickness: 'value' },
        '性别': { caption: true, thickness: 'value' },
        '拥有': { caption: true, thickness: 'value' },
        '故事理解': { caption: true, thickness: 'value' },
        '数字资源满意度': { caption: true, thickness: 'value' },
        '是否借助拼音': { caption: true, thickness: 'value' },
        '智慧图书馆期待程度': { caption: true, thickness: 'value' },
        '最喜欢的书': { caption: true, thickness: 'value' },
        '篇幅': { caption: true, thickness: 'value' },
        '纸质图书满意度': { caption: true, thickness: 'value' },
        '语言表达': { caption: true, thickness: 'value' },
        '读物来源': { caption: true, thickness: 'value' },
        '购买决定': { caption: true, thickness: 'value' },
        '阅读分享': { caption: true, thickness: 'value' },
        '阅读困难': { caption: true, thickness: 'value' },
        '阅读姿势': { caption: true, thickness: 'value' },
        '阅读工具': { caption: true, thickness: 'value' },
        '阅读数量': { caption: true, thickness: 'value' },
        '阅读方式': { caption: true, thickness: 'value' },
        '阅读时长': { caption: true, thickness: 'value' },
        '阅读氛围满意度': { caption: true, thickness: 'value' },
        '阅读目的': { caption: true, thickness: 'value' },
        '阅读计划': { caption: true, thickness: 'value' },
        '阅读顺序': { caption: true, thickness: 'value' },
        '阅读频率': { caption: true, thickness: 'value' }
      },
      initialCypher: 'MATCH (n1)-[r]->(n2) RETURN r, n1, n2 LIMIT 100',
      arrows: true,
      hierarchical: true,
      hierarchical_sort_method: 'hubsize'
    }

    const viz = new NeoVis(config)
    viz.render()
  }
}
</script>
