<template>
  <div class="home">
    <div class="home-header">
      <van-nav-bar
        title="weChat"
      />
    </div>
    <div class="home-content">
      <van-row type="flex" justify="center">
        <van-col span="18">
          <div class="click_item" @click="toShow">
            <svg-icon icon-class="friend"></svg-icon>
            <div class="item-right">
              <h3>聊天室</h3>
              <p>开始快乐聊天之旅</p>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <footer>
      <p>2019 &copy; made by coderly - <a href="http://www.beian.miit.gov.cn">浙ICP备19015516号-2</a> </p>
    </footer>
    <!-- <van-overlay :show="show" @click="show = false" /> -->
    <van-dialog
      v-model="show"
      title="输入昵称"
      show-cancel-button
      :beforeClose="beforeClose"
      >
     <div>
        <van-cell-group>
          <van-field v-model="value" required placeholder="请输入昵称" />
        </van-cell-group>
     </div>
    </van-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      value: ''
    }
  },
  methods: {
    toShow () {
      this.show = true
    },
    async beforeClose (action, done) {
      if (action === 'confirm') {
        if (!this.value) {
          this.$toast.fail('昵称不能为空')
          done(false)
        } else {
          let avatar = '/img/' + (Math.floor(Math.random() * 15) + 1) + '.jpg'
          await this.$store.dispatch('chatmsg/setUset', { name: this.value, avatar })
          await this.$store.dispatch('chatmsg/createSocket')
          this.$router.push('/room')
        }
      }
      done()
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  max-width: 768px;
  margin: 0 auto;
  background: #fff;
  // background: skyblue;
  min-height: 100vh;
  .home-content {
    padding-top: 30px;
    box-sizing: border-box;
    border-top: 1px solid transparent;
    .click_item {
      cursor: pointer;
      padding: 20px 10px;
      box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: 0.1);
      display: flex;
      svg {
        width: 70px;
        height: 70px;
      }
      .item-right {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        h3{
          text-align: center;
          padding: 0;
          margin: 0;
        }
        p{
          text-align: center;
          font-size: 13px;
          color: #444;
        }
      }
    }
  }
  footer {
    height: 60px;
    width: 100%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    p{
      text-align: center;
      font-size: 0.2rem;
      flex: 1;
      font-weight: 200;
      font-family: '微软雅黑';
      text-align: center;
      color: #929292;
    }
  }
}
@media screen and(min-width: 500px) {
  .home {
    .home-content {
      .click_item {
        cursor: pointer;
        padding: 30px 50px;
        box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: 0.1);
        display: flex;
        svg {
          width: 150px;
          height: 150px;
        }
        .item-right {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: center;
          h3{
            font-size: 30px;
            text-align: center;
            padding: 0;
            margin: 0;
          }
          p{
            text-align: center;
            font-size: 17px;
            color: #444;
          }
        }
      }
    }
  }
}
</style>
