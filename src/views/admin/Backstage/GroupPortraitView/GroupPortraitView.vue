<template>
  <div id="vizContainer" style="width: 100%; height: 100%"></div>
</template>

<script>
import NeoVis from 'neovis.js'

export default {
  name: 'NeoVisGraph',
  mounted() {
    const config = {
      containerId: 'vizContainer',
      neo4j: {
        serverUrl: 'bolt://gpu2.csubot.cn:7687',
        serverUser: 'neo4j',
        serverPassword: '123456'
      },
      labels: {
        commit: {
          label: 'parent',
          value: 'pagerank',
          group: 'community'
        },
        code: {
          label: 'filename',
          value: 'pagerank',
          group: 'community'
        }
      },
      relationships: {
        hasCodeFile: {}
      },
      initialCypher: 'MATCH (n1)-[r]->(n2) RETURN r, n1, n2 LIMIT 25',
      arrows: true,
      console_debug: true
    }

    const viz = new NeoVis(config)
    viz.render()
  }
}
</script>
