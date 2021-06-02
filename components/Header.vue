<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-col :lg="12" :offset="0">
        <el-button @click="drawer = true" size="medium" type="text"> 
            <i class="el-icon-menu"></i>
        </el-button>
      </el-col>

      <!-- <el-menu-item v-for="(link, index) in links" :index="index" :key="link.title" :to="link.to">{{link.title}}</el-menu-item> -->
    </el-menu>
    <el-drawer
      title="Menu"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpenMenuTabs"
      @close="handleCloseMenuTabs">
      <el-menu-item :index="index" v-for="(item, index) in links" :key="item.title">
        <i :class="item.icon"></i>
        <nuxt-link :to="item.to">{{item.title}}</nuxt-link>
      </el-menu-item>
    </el-menu>
    </el-drawer>
  </div>
</template>
<style lang="sass"></style>
<script>
export default {
  data() {
    return {
      links: [
        {
          to: '/',
          title: 'Home',
          icon: 'el-icon-s-home'
        },
        {
          to: '/authorization',
          title: 'Log in',
          icon: 'el-icon-user-solid'
        }
      ],
      drawer: false,
      direction: 'ltr',
      activeIndex: 0,
    }
  },
  methods: {
    handleClose(done) {
      done()
    },
    handleOpenMenuTabs(key, keyPath) {
        console.log(key, keyPath);
    },
    handleCloseMenuTabs(key, keyPath) {
        console.log(key, keyPath);
    }
  },
}
</script>
