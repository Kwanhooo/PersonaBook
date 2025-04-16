<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/userStore'
import { getNowDate } from '@/utils/timeHelper'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import cloneDeep from 'lodash.clonedeep'
import $router from '@/router'
import { updateInfo } from '@/requests/account'
import type { UpdateInfoParam } from '@/interfaces/UpdateInfoParam'

const userStore = useUserStore()
const avatarUrl = ref('https://asset.0xcafebabe.cn/test.png')

// 表单值
const form = reactive({
  nickname: '', // 必填
  email: '', // 必填
  sex: false,
  grade: 0,
  favoriteType: '',
  favoriteMedia: '',
  address: ''
})

// 从Store初始化表单值
form.email = userStore.user.email
form.nickname = userStore.user.nickname
form.sex = userStore.user.sex
form.grade = userStore.user.grade
form.favoriteType = userStore.user.favoriteType
form.favoriteMedia = userStore.user.favoriteMedia
form.address = userStore.user.address

let originForm = cloneDeep(form)

const formRef = ref<FormInstance>()

const rules = {
  email: [
    { required: true, message: '邮箱为必填项', trigger: 'blur' },
    { type: 'email', message: '请检查邮箱格式是否正确', trigger: ['blur', 'change'] }
  ],
  nickname: [{ required: true, message: '昵称为必填项', trigger: 'blur' }]
} as FormRules

const grades = ref([
  { label: '一年级', value: 1 },
  { label: '二年级', value: 2 },
  { label: '三年级', value: 3 },
  { label: '四年级', value: 4 },
  { label: '五年级', value: 5 },
  { label: '六年级', value: 6 }
])

const bookTypes = ref([
  { label: '科幻', value: '科幻' },
  { label: '文学', value: '文学' }
  // TODO: 更多类型
])

const medias = ref([
  { label: '纸质书', value: '纸质书' },
  { label: '电子书', value: '电子书' }
  // TODO: 更多媒介
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

const submitForm = () => {
  const updateInfoParam = {
    nickname: form.nickname,
    email: form.email,
    sex: form.sex,
    grade: form.grade,
    favoriteType: form.favoriteType,
    favoriteMedia: form.favoriteMedia,
    address: form.address
  } as UpdateInfoParam
  updateInfo(updateInfoParam).then((res) => {
    if (res.data.code === 0) {
      ElMessage.success('用户信息修改成功')
      //
      userStore.user = res.data.data
      originForm = cloneDeep(form)
    } else {
      ElMessage.error('修改失败，请稍后再试！')
    }
  })
}

const resetForm = () => {
  Object.assign(form, originForm)
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
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="avatarUrl" :src="avatarUrl" class="avatar" />
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
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="true"></el-option>
            <el-option label="女" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="form.grade" placeholder="请选择">
            <el-option
              v-for="item in grades"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="喜爱的图书类别">
          <el-select v-model="form.favoriteType" placeholder="请选择">
            <el-option
              v-for="item in bookTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="喜爱的媒介">
          <el-select v-model="form.favoriteMedia" placeholder="请选择">
            <el-option
              v-for="item in medias"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交变更</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './ProfileEditView';
</style>
