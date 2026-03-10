<template>
  <div class="home-container">
    <!-- 动态背景 -->
    <div class="animated-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
      <div class="mesh-overlay"></div>
    </div>

    <!-- 顶部标题区 - 重新设计 -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="badge-container">
          <span class="badge">
            <span class="badge-dot"></span>
            AI智能旅行规划系统
          </span>
        </div>
        <h1 class="hero-title">
          <span class="title-line">探索世界</span>
          <span class="title-line gradient-text">从完美行程开始</span>
        </h1>
        <p class="hero-subtitle">
          结合人工智能与地图大数据，为您量身打造独一无二的旅行体验
        </p>
        
        <!-- 特性展示 - 重新设计 -->
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon-wrapper">
              <div class="feature-icon">{{ feature.icon }}</div>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 主表单区 - 玻璃态设计 -->
    <div class="form-section">
      <div class="glass-container">
        <div class="form-header">
          <h2>定制您的专属旅程</h2>
          <p>只需几步，AI 将为您规划完美行程</p>
        </div>

        <el-form 
          :model="formData" 
          :rules="rules" 
          ref="formRef" 
          label-position="top"
          class="trip-form"
        >
          <!-- 第一行：目的地和日期 -->
          <div class="form-row">
            <el-form-item label="目的地" prop="destination" class="form-item-large">
              <div class="input-wrapper">
                <div class="input-icon">
                  <el-icon><Location /></el-icon>
                </div>
                <el-input
                  v-model="formData.destination"
                  placeholder="输入您想去的城市，如：京都、巴黎、上海"
                  clearable
                  size="large"
                />
              </div>
            </el-form-item>

            <el-form-item label="出行日期" prop="dateRange" class="form-item-large">
              <div class="input-wrapper">
                <div class="input-icon">
                  <el-icon><Calendar /></el-icon>
                </div>
                <el-date-picker
                  v-model="formData.dateRange"
                  type="daterange"
                  range-separator="→"
                  start-placeholder="出发日期"
                  end-placeholder="返程日期"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  size="large"
                  :disabled-date="disabledDate"
                />
              </div>
            </el-form-item>
          </div>

          <!-- 第二行：偏好选择 -->
          <div class="form-row">
            <el-form-item label="旅行偏好" prop="preferences" class="form-item-full">
              <div class="preference-grid">
                <div 
                  v-for="pref in preferenceOptions" 
                  :key="pref.value"
                  class="preference-chip"
                  :class="{ active: formData.preferences.includes(pref.value) }"
                  @click="togglePreference(pref.value)"
                >
                  <span class="chip-icon">{{ pref.icon }}</span>
                  <span class="chip-label">{{ pref.label }}</span>
                  <div class="chip-check">
                    <el-icon v-if="formData.preferences.includes(pref.value)">
                      <Check />
                    </el-icon>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>

          <!-- 第三行：酒店偏好 -->
          <div class="form-row">
            <el-form-item label="住宿偏好" prop="hotelPreferences" class="form-item-full">
              <div class="hotel-grid">
                <div 
                  v-for="hotel in hotelOptions" 
                  :key="hotel.value"
                  class="hotel-option"
                  :class="{ active: formData.hotelPreferences.includes(hotel.value) }"
                  @click="toggleHotel(hotel.value)"
                >
                  <div class="hotel-icon">{{ hotel.icon }}</div>
                  <div class="hotel-info">
                    <div class="hotel-name">{{ hotel.label }}</div>
                    <div class="hotel-price">{{ hotel.price }}</div>
                  </div>
                  <div class="hotel-check">
                    <el-icon v-if="formData.hotelPreferences.includes(hotel.value)">
                      <Check />
                    </el-icon>
                  </div>
                </div>
              </div>
            </el-form-item>
          </div>

          <!-- 第四行：预算 -->
          <div class="form-row">
            <el-form-item label="预算范围" prop="budget" class="form-item-full">
              <div class="budget-selector">
                <div 
                  v-for="budget in budgetOptions" 
                  :key="budget.value"
                  class="budget-card"
                  :class="{ active: formData.budget === budget.value }"
                  @click="formData.budget = budget.value"
                >
                  <div class="budget-icon">{{ budget.icon }}</div>
                  <div class="budget-label">{{ budget.label }}</div>
                  <div class="budget-range">{{ budget.range }}</div>
                  <div class="budget-indicator"></div>
                </div>
              </div>
            </el-form-item>
          </div>

          <!-- 提交按钮 -->
          <div class="form-actions">
            <button
              type="button"
              class="submit-btn"
              :class="{ loading: loading }"
              @click="handleSubmit"
              :disabled="loading"
            >
              <span class="btn-content" v-if="!loading">
                <span class="btn-icon">✨</span>
                <span class="btn-text">开始规划我的旅程</span>
                <span class="btn-arrow">→</span>
              </span>
              <span class="btn-content" v-else>
                <span class="spinner"></span>
                <span class="btn-text">AI 正在为您规划中...</span>
              </span>
            </button>
          </div>
        </el-form>
      </div>
    </div>

    <!-- 示例行程 - 卡片设计 -->
    <div class="examples-section">
      <div class="section-header">
        <div class="header-badge">
          <span>🔥</span>
          <span>热门推荐</span>
        </div>
        <h2>一键体验示例行程</h2>
        <p>点击卡片快速填充，立即开始规划</p>
      </div>

      <div class="examples-grid">
        <div 
          v-for="(example, index) in examples" 
          :key="index"
          class="example-card"
          @click="fillExample(example)"
        >
          <div class="example-image">
            <div class="example-gradient"></div>
            <div class="example-icon">{{ example.icon }}</div>
          </div>
          <div class="example-content">
            <h3>{{ example.title }}</h3>
            <p>{{ example.description }}</p>
            <div class="example-meta">
              <span class="meta-item">
                <el-icon><Clock /></el-icon>
                {{ example.data.days }}天{{ example.data.days - 1 }}晚
              </span>
              <span class="meta-item">
                <el-icon><Wallet /></el-icon>
                {{ example.data.budget }}
              </span>
            </div>
          </div>
          <div class="example-hover">
            <span>点击填充</span>
            <el-icon><Right /></el-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- 加载进度弹窗 -->
    <LoadingProgress 
      ref="loadingProgressRef"
      v-model:visible="loadingProgressVisible"
      @cancel="handleCancelRequest"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Location, Calendar, Check, Clock, Wallet, Right } from '@element-plus/icons-vue'
import axios from 'axios'
import { tripApi } from '@/services/api'
import LoadingProgress from '@/components/LoadingProgress.vue'
import type { TripFormData, TripPlanRequest } from '@/types'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref(false)
const loadingProgressVisible = ref(false)
const loadingProgressRef = ref<InstanceType<typeof LoadingProgress>>()
const cancelTokenSource = ref<{ cancel: (message?: string) => void } | null>(null)

// 表单数据
const formData = reactive<TripFormData>({
  destination: '',
  dateRange: ['', ''],
  preferences: [],
  hotelPreferences: [],
  budget: '中等'
})

// 特性数据
const features = [
  {
    icon: '🎯',
    title: '精准匹配',
    desc: '基于您的偏好智能推荐'
  },
  {
    icon: '🗺️',
    title: '可视化路线',
    desc: '地图实时展示最优路径'
  },
  {
    icon: '💡',
    title: '灵活调整',
    desc: '随时编辑优化您的行程'
  }
]

// 偏好选项
const preferenceOptions = [
  { icon: '🏯', label: '历史文化', value: '历史' },
  { icon: '🌄', label: '自然风光', value: '自然' },
  { icon: '🍜', label: '美食体验', value: '美食' },
  { icon: '🛍️', label: '购物娱乐', value: '购物' },
  { icon: '👶', label: '亲子游玩', value: '亲子' },
  { icon: '📸', label: '摄影打卡', value: '摄影' },
  { icon: '☘️', label: '休闲放松', value: '休闲' }
]

// 酒店选项
const hotelOptions = [
  { icon: '🏠', label: '经济型', value: '经济型', price: '¥200-400/晚' },
  { icon: '🏡', label: '舒适型', value: '舒适型', price: '¥400-800/晚' },
  { icon: '🏪', label: '高档型', value: '高档型', price: '¥800-1500/晚' },
  { icon: '🏨', label: '豪华型', value: '豪华型', price: '¥1500+/晚' },
  { icon: '🏕️', label: '民宿客栈', value: '民宿', price: '¥200-500/晚' }
]

// 预算选项
const budgetOptions = [
  { icon: '💰', label: '经济', value: '经济', range: '约 ¥1000-3000' },
  { icon: '💵', label: '中等', value: '中等', range: '约 ¥3000-6000' },
  { icon: '💸', label: '宽裕', value: '宽裕', range: '约 ¥6000-10000' },
  { icon: '💎', label: '豪华', value: '豪华', range: '约 ¥10000+' }
]

// 表单验证规则
const rules: FormRules = {
  destination: [
    { required: true, message: '请输入目的地', trigger: 'blur' }
  ],
  dateRange: [
    { required: true, message: '请选择出行日期', trigger: 'change' }
  ]
}

// 禁用过去的日期
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
}

// 切换偏好
const togglePreference = (value: string) => {
  const index = formData.preferences.indexOf(value)
  if (index > -1) {
    formData.preferences.splice(index, 1)
  } else {
    formData.preferences.push(value)
  }
}

// 切换酒店
const toggleHotel = (value: string) => {
  const index = formData.hotelPreferences.indexOf(value)
  if (index > -1) {
    formData.hotelPreferences.splice(index, 1)
  } else {
    formData.hotelPreferences.push(value)
  }
}

// 示例行程
const examples = [
  {
    title: '京都古韵之旅',
    description: '漫步千年古都，体验和风之美',
    icon: '⛩️',
    data: {
      destination: '京都',
      days: 4,
      preferences: ['历史', '摄影', '美食'],
      hotelPreferences: ['舒适型', '民宿'],
      budget: '宽裕'
    }
  },
  {
    title: '成都巴适生活',
    description: '品味川菜，感受慢生活节奏',
    icon: '🐼',
    data: {
      destination: '成都',
      days: 3,
      preferences: ['美食', '休闲'],
      hotelPreferences: ['舒适型', '高档型'],
      budget: '中等'
    }
  },
  {
    title: '上海摩登都市',
    description: '探索东方明珠的时尚魅力',
    icon: '🌃',
    data: {
      destination: '上海',
      days: 3,
      preferences: ['购物', '摄影', '美食'],
      hotelPreferences: ['高档型', '豪华型'],
      budget: '宽裕'
    }
  }
]

// 填充示例数据
const fillExample = (example: any) => {
  formData.destination = example.data.destination
  formData.preferences = [...example.data.preferences]
  formData.hotelPreferences = [...example.data.hotelPreferences]
  formData.budget = example.data.budget
  
  const today = new Date()
  const startDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  const endDate = new Date(startDate.getTime() + (example.data.days - 1) * 24 * 60 * 60 * 1000)
  
  formData.dateRange = [
    startDate.toISOString().split('T')[0],
    endDate.toISOString().split('T')[0]
  ]
  
  ElMessage.success({
    message: '示例数据已填充，开始规划您的旅程吧！',
    duration: 2000
  })
}

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    if (!authStore.isAuthenticated) {
      try {
        await ElMessageBox.confirm(
          '您需要登录后才能使用行程规划功能，是否前往登录？',
          '未登录提示',
          {
            confirmButtonText: '前往登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
        router.push('/login')
      } catch {
        ElMessage.info('请先登录后再使用行程规划功能')
      }
      return
    }
    
    loading.value = true
    loadingProgressVisible.value = true
    
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    cancelTokenSource.value = source
    
    try {
      const request: TripPlanRequest = {
        destination: formData.destination,
        start_date: formData.dateRange[0],
        end_date: formData.dateRange[1],
        preferences: formData.preferences,
        hotel_preferences: formData.hotelPreferences,
        budget: formData.budget
      }
      
      const result = await tripApi.createTripPlan(request, source.token)
      
      loadingProgressRef.value?.completeProgress()
      
      setTimeout(() => {
        loadingProgressVisible.value = false
        
        try {
          const savedTrips = JSON.parse(localStorage.getItem('myTrips') || '[]')
          const newTrip = {
            ...result,
            id: Date.now().toString(),
            created_at: new Date().toISOString()
          }
          savedTrips.unshift(newTrip)
          if (savedTrips.length > 100) {
            savedTrips.pop()
          }
          localStorage.setItem('myTrips', JSON.stringify(savedTrips))
          sessionStorage.setItem('currentTripPlan', JSON.stringify(newTrip))
          
          ElMessage.success('行程规划成功！已保存到我的行程')
        } catch (error) {
          console.error('保存行程失败:', error)
          sessionStorage.setItem('currentTripPlan', JSON.stringify(result))
          ElMessage.success('行程规划成功！')
        }
        
        router.push({
          name: 'Result',
          state: { tripPlan: result }
        })
      }, 800)
    } catch (error: any) {
      if (axios.isCancel(error)) {
        return
      }
      loadingProgressVisible.value = false
      ElMessage.error(error.message || '规划失败，请重试')
      console.error('规划失败:', error)
    } finally {
      loading.value = false
      cancelTokenSource.value = null
    }
  })
}

// 处理取消请求
const handleCancelRequest = () => {
  if (cancelTokenSource.value) {
    cancelTokenSource.value.cancel('用户取消了请求')
    cancelTokenSource.value = null
  }
  loading.value = false
  ElMessage.info('已取消请求，您的表单信息已保留')
}
</script>

<style scoped lang="scss">
// 导入自定义字体（使用 Google Fonts）
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap');

// CSS 变量
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.18);
  --text-primary: #1a1a2e;
  --text-secondary: #6b7280;
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 20px 60px rgba(0, 0, 0, 0.16);
}

.home-container {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
}

// 动态背景
.animated-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.5;
    animation: float 20s ease-in-out infinite;

    &.orb-1 {
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, #667eea 0%, transparent 70%);
      top: -300px;
      left: -200px;
      animation-delay: 0s;
    }

    &.orb-2 {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, #f093fb 0%, transparent 70%);
      top: 40%;
      right: -150px;
      animation-delay: 7s;
    }

    &.orb-3 {
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, #4facfe 0%, transparent 70%);
      bottom: -200px;
      left: 30%;
      animation-delay: 14s;
    }
  }

  .mesh-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }
}

// Hero Section
.hero-section {
  position: relative;
  padding: 120px 24px 80px;
  z-index: 1;

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;

    .badge-container {
      margin-bottom: 32px;
      animation: fadeInDown 0.8s ease;

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 20px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 100px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        backdrop-filter: blur(20px);

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #4facfe;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
      }
    }

    .hero-title {
      margin: 0 0 32px 0;
      line-height: 1.2;
      animation: fadeInUp 0.8s ease 0.2s backwards;

      .title-line {
        display: block;
        font-family: 'Playfair Display', serif;
        font-size: 64px;
        font-weight: 700;
        color: white;

        &.gradient-text {
          background: linear-gradient(135deg, #fff 0%, #a8b3ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }
    }

    .hero-subtitle {
      margin: 0 auto 64px;
      max-width: 600px;
      font-size: 18px;
      line-height: 1.8;
      color: rgba(255, 255, 255, 0.8);
      animation: fadeInUp 0.8s ease 0.4s backwards;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
      max-width: 900px;
      margin: 0 auto;

      .feature-card {
        padding: 32px 24px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 24px;
        backdrop-filter: blur(20px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        animation: fadeInUp 0.8s ease backwards;

        &:nth-child(1) { animation-delay: 0.5s; }
        &:nth-child(2) { animation-delay: 0.6s; }
        &:nth-child(3) { animation-delay: 0.7s; }

        &:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .feature-icon-wrapper {
          margin-bottom: 16px;

          .feature-icon {
            display: inline-block;
            font-size: 48px;
            animation: bounce 2s ease-in-out infinite;
          }
        }

        h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 600;
          color: white;
        }

        p {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }
      }
    }
  }
}

// Form Section
.form-section {
  position: relative;
  padding: 0 24px 80px;
  z-index: 1;

  .glass-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 48px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 32px;
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.2);
    animation: fadeInUp 0.8s ease 0.8s backwards;

    .form-header {
      margin-bottom: 40px;
      text-align: center;

      h2 {
        margin: 0 0 12px 0;
        font-size: 32px;
        font-weight: 700;
        color: var(--text-primary);
        font-family: 'Playfair Display', serif;
      }

      p {
        margin: 0;
        font-size: 16px;
        color: var(--text-secondary);
      }
    }

    .trip-form {
      .form-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        margin-bottom: 32px;

        .form-item-full {
          grid-column: 1 / -1;
        }

        :deep(.el-form-item__label) {
          font-size: 15px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 12px;
        }

        .input-wrapper {
          position: relative;

          .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            color: #667eea;
            font-size: 20px;
          }

          :deep(.el-input__wrapper) {
            padding-left: 48px;
            border-radius: 16px;
            border: 2px solid #e5e7eb;
            box-shadow: none;
            transition: all 0.3s;

            &:hover, &.is-focus {
              border-color: #667eea;
              box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
            }
          }

          :deep(.el-date-editor) {
            width: 100%;

            .el-input__wrapper {
              padding-left: 48px;
              border-radius: 16px;
              border: 2px solid #e5e7eb;
            }
          }
        }
      }

      // 偏好网格
      .preference-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* 每行四列 */
        gap: 12px; /* 元素之间的间距 */
        justify-items: center; /* 横向居中对齐 */
        align-items: center; /* 垂直居中对齐 */
      }

      .preference-chip {
        position: relative;
        padding: 16px;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 12px;
        text-align: center; /* 确保标签内容居中 */
        width: 100%; /* 确保每个选项宽度自适应 */
        max-width: 200px; /* 控制最大宽度，避免过大 */
      }

      .preference-chip:hover {
        border-color: #667eea;
        background: #f3f4ff;
        transform: translateY(-2px);
      }

      .preference-chip.active {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-color: #667eea;
        color: white;
      }

      .preference-chip .chip-icon {
        font-size: 24px;
      }

      .preference-chip .chip-label {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
      }

      .preference-chip .chip-check {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #667eea;
      }

      /* 响应式调整 */
      @media (max-width: 1024px) {
        .preference-grid {
          grid-template-columns: repeat(2, 1fr); /* 小屏幕时每行2列 */
        }
      }

      @media (max-width: 768px) {
        .preference-grid {
          grid-template-columns: 1fr; /* 超小屏幕时每行1列 */
        }
      }
      // 酒店网格
      .hotel-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 每行三列 */
        gap: 16px; /* 元素之间的间距 */
      }

      .hotel-option {
        padding: 20px;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 16px;

        &:hover {
          border-color: #667eea;
          background: #f3f4ff;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
        }

        &.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;

          .hotel-info {
            .hotel-name, .hotel-price {
              color: white;
            }
          }

          .hotel-check {
            background: white;
            color: #667eea;
          }
        }

        .hotel-icon {
          font-size: 32px;
        }

        .hotel-info {
          flex: 1;

          .hotel-name {
            font-size: 15px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 4px;
          }

          .hotel-price {
            font-size: 13px;
            color: var(--text-secondary);
          }
        }

        .hotel-check {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
        }
      }

      /* 响应式调整：在小屏幕下适应布局 */
      @media (max-width: 1024px) {
        .hotel-grid {
          grid-template-columns: repeat(2, 1fr); /* 中屏幕时每行2列 */
        }
      }

      @media (max-width: 768px) {
        .hotel-grid {
          grid-template-columns: 1fr; /* 小屏幕时每行1列 */
        }
      }

      // 预算选择器
     .budget-selector {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* 每行四列 */
        gap: 16px; /* 元素之间的间距 */
      }

      .budget-card {
        position: relative;
        padding: 24px;
        background: #f9fafb;
        border: 2px solid #e5e7eb;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transform: scaleX(0);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        &:hover {
          border-color: #667eea;
          background: #f3f4ff;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
        }

        &.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;

          &::before {
            transform: scaleX(1);
          }

          .budget-label, .budget-range {
            color: white;
          }
        }

        .budget-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }

        .budget-label {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .budget-range {
          font-size: 13px;
          color: var(--text-secondary);
        }
      }

      /* 响应式调整：在小屏幕下适应布局 */
      @media (max-width: 1024px) {
        .budget-selector {
          grid-template-columns: repeat(2, 1fr); /* 小屏幕时每行2列 */
        }
      }

      @media (max-width: 768px) {
        .budget-selector {
          grid-template-columns: 1fr; /* 超小屏幕时每行1列 */
        }
      }

    /* 响应式调整：小屏幕下依然保持一行排列 */
    @media (max-width: 1024px) {
      .budget-selector {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* 中屏幕时仍保持自适应布局 */
      }
    }

    @media (max-width: 768px) {
      .budget-selector {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* 小屏幕下也自适应 */
      }
    }

      // 提交按钮
      .form-actions {
        margin-top: 40px;

        .submit-btn {
          width: 100%;
          padding: 20px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 16px;
          color: white;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
          }

          &:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 40px rgba(102, 126, 234, 0.4);

            &::before {
              left: 100%;
            }

            .btn-arrow {
              transform: translateX(8px);
            }
          }

          &:active {
            transform: translateY(-2px);
          }

          &.loading {
            cursor: not-allowed;
            opacity: 0.8;
          }

          .btn-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;

            .btn-icon {
              font-size: 20px;
            }

            .btn-text {
              font-size: 16px;
            }

            .btn-arrow {
              font-size: 20px;
              transition: transform 0.3s;
            }

            .spinner {
              width: 20px;
              height: 20px;
              border: 3px solid rgba(255, 255, 255, 0.3);
              border-top-color: white;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }
          }
        }
      }
    }
  }
}

// Examples Section
.examples-section {
  position: relative;
  padding: 0 24px 120px;
  z-index: 1;

  .section-header {
    max-width: 1200px;
    margin: 0 auto 48px;
    text-align: center;

    .header-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 100px;
      color: white;
      font-size: 14px;
      font-weight: 500;
      backdrop-filter: blur(20px);
      margin-bottom: 24px;
    }

    h2 {
      margin: 0 0 12px 0;
      font-size: 36px;
      font-weight: 700;
      color: white;
      font-family: 'Playfair Display', serif;
    }

    p {
      margin: 0;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;

    .example-card {
      position: relative;
      background: white;
      border-radius: 24px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);

      &:hover {
        transform: translateY(-12px);
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.24);

        .example-image {
          .example-gradient {
            opacity: 0.7;
          }

          .example-icon {
            transform: scale(1.2) rotate(10deg);
          }
        }

        .example-hover {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .example-image {
        position: relative;
        height: 200px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        .example-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
          opacity: 0.5;
          transition: opacity 0.5s;
        }

        .example-icon {
          font-size: 80px;
          position: relative;
          z-index: 1;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }

      .example-content {
        padding: 28px;

        h3 {
          margin: 0 0 12px 0;
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
        }

        p {
          margin: 0 0 20px 0;
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .example-meta {
          display: flex;
          gap: 16px;

          .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-secondary);
            padding: 6px 12px;
            background: #f3f4f6;
            border-radius: 8px;

            .el-icon {
              font-size: 16px;
            }
          }
        }
      }

      .example-hover {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px 28px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        opacity: 0;
        transform: translateY(100%);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }
}

// 动画
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-50px) translateX(50px);
  }
  66% {
    transform: translateY(50px) translateX(-50px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// 响应式设计
@media (max-width: 1024px) {
  .hero-section {
    padding: 100px 24px 60px;

    .hero-content {
      .hero-title .title-line {
        font-size: 48px;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  }

  .form-section .glass-container {
    padding: 32px 24px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 20px 40px;

    .hero-content {
      .hero-title .title-line {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 16px;
      }
    }
  }

  .form-section .glass-container {
    padding: 24px 20px;

    .form-header h2 {
      font-size: 24px;
    }

    .trip-form .form-row {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .preference-grid {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
    }

    .hotel-grid {
      grid-template-columns: 1fr !important;
    }

    .budget-selector {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  .examples-section {
    .section-header h2 {
      font-size: 28px;
    }

    .examples-grid {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
}
</style>