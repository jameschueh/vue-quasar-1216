<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">產品表單</div>
        <div class="text-subtitle2">請輸入產品資訊</div>
      </q-card-section>

      <q-card-section>
        <q-form ref="formRef" @submit="submitForm" @reset="resetForm">
          <!-- 產品名稱 -->
          <q-input
            v-model="formData.name"
            label="產品名稱"
            :rules="[rules.required]"
            outlined
            dense
            clearable
          />

          <!-- 價格 -->
          <q-input
            v-model.number="formData.price"
            label="價格 (NTD)"
            type="number"
            :rules="[rules.required, rules.positiveNumber]"
            outlined
            dense
            clearable
          />

          <!-- 描述 -->
          <q-input
            v-model="formData.description"
            label="產品描述"
            type="textarea"
            :rules="[rules.required]"
            outlined
            dense
          />

          <!-- 類別 -->
          <q-select
            v-model="formData.category"
            label="類別"
            :options="categories"
            :rules="[rules.required]"
            outlined
            dense
          />

          <!-- 是否有庫存 -->
          <q-checkbox v-model="formData.inStock" label="有庫存" />

          <!-- 按鈕 -->
          <div class="q-mt-md">
            <q-btn
              label="提交"
              color="primary"
              type="submit"
              class="full-width"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="secondary"
              flat
              class="full-width q-mt-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// 表單數據
const formData = ref({
  name: "",
  price: null,
  description: "",
  category: null,
  inStock: false,
});

// 類別選項
const categories = ref([
  { label: "電子產品", value: "electronics" },
  { label: "服飾", value: "apparel" },
  { label: "家居用品", value: "home" },
  { label: "書籍", value: "books" },
]);

// Quasar 驗證規則
const rules = {
  required: (val) => !!val || "此為必填項",
  positiveNumber: (val) => val > 0 || "價格必須大於零",
  name: (val) => !!val || "產品名稱為必填項",
};

const submitForm = () => {
  if (
    !rules.required(formData.value.name) ||
    !rules.required(formData.value.price) ||
    !rules.positiveNumber(formData.value.price) ||
    !rules.required(formData.value.description) ||
    !rules.required(formData.value.category)
  ) {
    $q.notify({ type: "negative", message: "表單有錯誤，請檢查。" });
    return;
  }

  console.log("formData.value", formData.value);
  $q.notify({ type: "positive", message: "產品資訊已成功提交！" });
};

const resetForm = () => {
  formData.value = {
    name: "",
    price: null,
    description: "",
    category: null,
    inStock: false,
  };
  $q.notify({ type: "info", message: "表單已重置" });
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
