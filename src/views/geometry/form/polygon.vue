<template>
  <div>
    <el-form ref="polygon" size="mini" :model="polygon" :label-position="'top'">
      <el-form-item label="是否填充">
        <el-radio v-model="polygon.fill" :label="true" border>填充</el-radio>
        <el-radio v-model="polygon.fill" :label="false" border>不填充</el-radio>
      </el-form-item>
      <el-form-item label="材质设置">
        <el-color-picker v-model="polygon.material_color" show-alpha :predefine="predefineColors"></el-color-picker>
      </el-form-item>
      <el-form-item label="高度(若设置高度，则是几何体)" class="clearBottom">
        <el-input-number v-model="polygon.extrudedHeight" :precision="4" :step="100"></el-input-number>
      </el-form-item>
      <el-form-item label="是否显示轮廓">
        <el-radio v-model="polygon.outline" :label="true" border>显示</el-radio>
        <el-radio v-model="polygon.outline" :label="false" border>不显示</el-radio>
      </el-form-item>
      <el-form-item label="轮廓颜色" v-if="polygon.outline">
        <el-color-picker v-model="polygon.outlineColor_deal"></el-color-picker>
      </el-form-item>
      <el-form-item label="轮廓宽度" v-if="polygon.outline">
        <el-input-number v-model="polygon.outlineWidth" :precision="1" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="动态绘制">
        <el-button icon="el-icon-circle-plus" type="success" size="mini" @click="drawPolygon"
          >点击开始动态绘制</el-button
        >
        <el-tooltip class="item" effect="dark" content="动态绘制使用规则(点击查看)" placement="top-start">
          <el-button icon="el-icon-warning-outline" size="mini" type="info" circle @click="seeInfo"></el-button>
        </el-tooltip>
      </el-form-item>
    </el-form>

    <polygon-dialog :show.sync="show"></polygon-dialog>
  </div>
</template>

<script>
import config from '@/data/geometry_config.json'
import polygonDialog from '@/components/dialog/geometry/polygonDraw.vue'
export default {
  props: {
    submitForm: {
      type: Boolean,
      default: false,
    },
    polygon: {
      type: Object,
      default: {},
    },
    form: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      predefineColors: config.color,
      show: false,
    }
  },
  methods: {
    handleData() {
      this.$emit('polygon', this.polygon)
    },
    drawPolygon() {
      let _this = this
      this.$store.commit('SET_LEFT_INNERDRAWER', false)
      this.$store.commit('SET_LEFT_DRAWER', false)
      this.$store.commit('SET_DYNAMIC', true)
      this.$store.commit('SET_DRAW_TYPE', 'polygon')
      this.form.id = 'polygon:' + new Date().getTime()
      this.form.polygon = this.polygon
      this.$store.commit('SET_DRAW_STYLE', {
        data: _this.form,
      })
      this.$notify({
        title: '绘制多边形',
        message: '请在地图中动态绘制多边形',
        type: 'info',
        offset: 60,
      })
    },
    seeInfo() {
      this.show = true
    },
  },
  watch: {
    submitForm: {
      immediate: true,
      handler: function(newV, oldV) {
        if (newV) {
          this.handleData()
        }
      },
    },
  },
  components: {
    polygonDialog,
  },
}
</script>

<style lang="scss" scoped>
.clearBottom {
  margin-bottom: 0px;
}
.item {
  margin: 4px;
}
</style>
