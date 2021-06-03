<template>
  <div>
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-row :gutter="20" type="flex" align="center">
        <el-col :span="22" :offset="0">
          <el-menu-item>
            <el-button @click="drawer = true" size="medium" > 
                <i class="el-icon-menu"></i>
            </el-button>
          </el-menu-item>
        </el-col>
        <el-col :span="2" :offset="0">
          <el-menu-item>
            <el-button type="text" size="default" @click="logOutHandler()" v-if="showLogOut">logout</el-button>
          </el-menu-item>
        </el-col>
      </el-row>
      
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
  computed: {
    showLogOut: function() {
      return this.$store.state.authorization.userAuthorized
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
    },
    logOutHandler(){
      this.$store.commit('authorization/UserLogout');
    }
  },
}
</script>
