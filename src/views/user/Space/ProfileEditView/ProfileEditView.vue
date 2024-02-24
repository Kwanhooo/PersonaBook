<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/userStore'
import { getNowDate } from '@/utils/timeHelper'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import cloneDeep from 'lodash.clonedeep'
import $router from '@/router'

const userStore = useUserStore()
const avatarUrl = ref('https://asset.0xcafebabe.cn/test.png')

// 表单值
const form = reactive({
  email: '',// 必填
  nickname: '',// 必填
  gender: '',
  birth: '',
  grade: '',
  favoriteBookType: '',
  favoriteMedia: '',
  nationOrRegion: '',
  district: '',
  address: ''
})

const initialForm = cloneDeep(form)

const formRef = ref<FormInstance>()

const rules = {
  email: [
    { required: true, message: '邮箱为必填项', trigger: 'blur' },
    { type: 'email', message: '请检查邮箱格式是否正确', trigger: ['blur', 'change'] }
  ],
  nickname: [
    { required: true, message: '昵称为必填项', trigger: 'blur' }
  ]
} as FormRules

const grades = ref([
  { label: '一年级', value: '1' },
  { label: '二年级', value: '2' },
  { label: '三年级', value: '3' }
  // TODO: 更多年级
])

const bookTypes = ref([
  { label: '科幻', value: 'sci-fi' },
  { label: '文学', value: 'literature' }
  // TODO: 更多类型
])

const medias = ref([
  { label: '纸质书', value: 'paper' },
  { label: '电子书', value: 'ebook' }
  // TODO: 更多媒介
])

const nations = ref([
  { label: '中国', value: 'CN' },
  { label: '美国', value: 'US' }
  // TODO: 更多国家或地区
])

const districts = ref([
  { label: '朝阳区', value: 'chaoyang' },
  { label: '海淀区', value: 'haidian' }
  // TODO: 更多行政区
])

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg'
  const isPNG = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error('上传头像图片只能是 JPG 或 PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
  return (isJPG || isPNG) && isLt2M
}

const handleAvatarSuccess = (res: any, file: any) => {
  console.log(res, file)
  avatarUrl.value = URL.createObjectURL(file.raw)
}

const submitForm = (formEl: FormInstance | undefined) => {
  console.log(formEl)
}

const resetForm = () => {
  Object.assign(form, initialForm)
}

</script>

<template>
  <div class="profile-edit-view-wrapper">
    <div class="basic-info-wrapper">
      <div class="avatar">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </div>
      <div class="info">
        <div>昵称：{{ userStore.user.nickname }}</div>
        <div>用户名：{{ userStore.user.username }}</div>
        <div>注册时间：{{ getNowDate() }}</div>
      </div>
    </div>
    <div class="form-wrapper">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
          <el-link type="primary" @click="$router.push('/space/reset-password')">修改密码</el-link>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
            <el-option label="其它" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker v-model="form.birth" placeholder="请选择"></el-date-picker>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="form.grade" placeholder="请选择">
            <el-option v-for="item in grades" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="喜爱的图书类别">
          <el-select v-model="form.favoriteBookType" placeholder="请选择">
            <el-option v-for="item in bookTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="喜爱的媒介">
          <el-select v-model="form.favoriteMedia" placeholder="请选择">
            <el-option v-for="item in medias" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家或地区">
          <el-select v-model="form.nationOrRegion" placeholder="请选择">
            <el-option v-for="item in nations" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区">
          <el-select v-model="form.district" placeholder="请选择">
            <el-option v-for="item in districts" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(formRef)">提交变更</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "./ProfileEditView";
</style>
