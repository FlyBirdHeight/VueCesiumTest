<template>
  <el-form ref="form" size="mini" :model="form" :label-position="'top'" style="padding:15px">
    <el-form-item label="创建类型" class="clearBottom">
      <el-select v-model="form.type" clearable placeholder="请选择">
        <el-option
          v-for="geometry in geometryType"
          :key="geometry.value"
          :label="geometry.label"
          :value="geometry.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="form.name" placeholder="名称"></el-input>
    </el-form-item>
    <el-form-item label="介绍">
      <el-input v-model="form.description" placeholder="介绍"></el-input>
    </el-form-item>
    <el-form-item label="经纬度设置" class="clearBottom" v-if="form.type != 'polygon' && form.type != 'polyline'">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input v-model="$store.state.geometryForm.lon" placeholder="经度"></el-input>
        </el-col>
        <el-col :span="8">
          <el-input v-model="$store.state.geometryForm.lat" placeholder="纬度"></el-input>
        </el-col>
        <el-col :span="8">
          <el-button
            icon="el-icon-circle-plus"
            type="success"
            size="mini"
            @click="selectPosition"
            style="padding-right:10px"
            >自定义选择</el-button
          >
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="高度(距离地面高度)" class="clearBottom">
      <el-input-number v-model="form.height" :precision="4" :step="10"></el-input-number>
    </el-form-item>
    <el-form-item label="是否显示" class="clearBottom">
      <el-radio v-model="form.show" :label="true" border>显示</el-radio>
      <el-radio v-model="form.show" :label="false" border>不显示</el-radio>
    </el-form-item>
    <billboard v-if="form.type == 'billboard'" :submitForm="submitForm" :billboard="billboard"></billboard>
    <polygon-create v-if="form.type == 'polygon'" :submitForm="submitForm" :polygon="polygon" :form="form"></polygon-create>
    <polyline-create v-if="form.type == 'polyline'" :submitForm="submitForm" :polyline="polyline" :form="form"></polyline-create>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="resetForm">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import type from '@/data/geometry_type.json'
import billboard from '@/views/geometry/form/billboard'
import polygonCreate from '@/views/geometry/form/polygon'
import geometry from '@/data/geometry_type.json'
import polylineCreate from '@/views/geometry/form/polyline'
export default {
  data() {
    return {
      viewer: this.$store.state.viewer.viewer,
      form: {
        type: '',
        position: {
          lon: '',
          lat: '',
        },
        height: '',
        name: '',
        description: '',
        show: true,
        id: '',
      },
      geometryType: type.geometryType,
      submitForm: false,
      billboard: geometry.billboard,
      polygon: geometry.polygon,
      point: {},
      polyline: geometry.polyline
    }
  },
  methods: {
    selectPosition() {
      this.$store.commit('SET_LEFT_INNERDRAWER', false)
      this.$store.commit('SET_LEFT_DRAWER', false)
      this.$store.commit('SET_SELECT_POSITION', true)
      this.$notify({
        title: '选择经纬度',
        message: '请在地图中选择需要添加几何体的位置',
        type: 'info',
        offset: 60,
      })
    },
    onSubmit() {
      let viewer = this.viewer
      this.form.position.lat = this.$store.state.geometryForm.lat
      this.form.position.lon = this.$store.state.geometryForm.lon
      switch (this.form.type) {
        case 'billboard':
          this.createBillboardData(viewer)
          break
        case 'ellipsoid':
          break
        case 'label':
          break
        case 'point':
          break
        case 'polygon':
          console.log('polygon')
          break
        case 'rectangle':
          break
        case 'wall':
          break
        case 'cylinder':
          break
        case 'corridor':
          break
        case 'box':
          break
        default:
          break
      }
      this.$store.commit('SET_LEFT_INNERDRAWER', false)
      this.$store.commit('SET_LEFT_DRAWER', false)
      viewer.camera.setView({
        destination: this.Cesium.Cartesian3.fromDegrees(
          Number(this.form.position.lon),
          Number(this.form.position.lat),
          1000
        ),
      })
      this.$store.commit('SET_VIEWER', viewer)
      this.resetForm()
    },
    resetForm() {
      this.form = {
        type: '',
        position: {
          lon: '',
          lat: '',
        },
        height: '',
        name: '',
        description: '',
        show: true,
        id: '',
      }
    },
    createBillboardData(viewer) {
      var Cesium = this.Cesium
      this.form.id = 'billboard:' + new Date().getTime()
      this.form.billboard = this.billboard
      this.createBillboardByCzml(this.form, viewer)
    },
    createPolygon() {
      let color = this.form.polygon.material_color
      color = color.substring(5, color.length - 1)
      this.form.polygon.material = color.split(',')
    },
  },
  components: {
    billboard,
    polygonCreate,
    polylineCreate
  },
}
</script>

<style lang="scss" scoped>
.clearBottom {
  margin-bottom: 0px;
}</style
><style>
.el-form--label-top .el-form-item__label {
  padding: 0px;
}
</style>
