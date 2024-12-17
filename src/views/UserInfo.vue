<template>
  <q-page class="q-pa-md">
    <!-- 用戶資訊區塊 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">用戶資訊</div>
        <q-separator />
        <q-list>
          <q-item v-for="(user, index) in users" :key="index">
            <q-item-section>
              <div class="text-body1">{{ user.name }}</div>
              <div class="text-caption">{{ user.email }}</div>
            </q-item-section>
            <q-item-section align="right">
              <q-btn
                label="編輯"
                color="primary"
                flat
                @click="editUser(user)"
              />
              <q-btn
                label="註銷"
                color="negative"
                flat
                @click="removeUser(user)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 編輯用戶區塊 -->
    <q-dialog v-model="isEditing" persistent max-width="500px">
      <q-card>
        <q-card-section>
          <div class="text-h6">編輯用戶資訊</div>
          <q-separator />
          <q-form @submit.prevent="updateUser">
            <q-input v-model="currentUser.name" label="姓名" autofocus />
            <q-input v-model="currentUser.email" label="電子郵件" />
          </q-form>
        </q-card-section>
        <q-card-actions>
          <q-btn
            label="取消"
            color="secondary"
            flat
            @click="isEditing = false"
          />
          <q-btn label="儲存" color="primary" flat @click="updateUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// 定義用戶資料的 TypeScript 類型
interface User {
  id: number;
  name: string;
  email: string;
}

const router = useRouter();
const users = ref<User[]>([]);
const isEditing = ref(false);
const currentUser = ref<User>({ id: 0, name: "", email: "" });

// 從 API 加載用戶資料
const fetchUsers = async () => {
  try {
    const response = await axios.get<User[]>("/api/users.json");
    users.value = response.data;
  } catch (error) {
    console.error("帶錯誤處理的 API 請求錯誤:", error);
  }
};

// 編輯用戶資訊
const editUser = (user: User) => {
  currentUser.value = { ...user };
  isEditing.value = true;
};

// 更新用戶資訊
const updateUser = () => {
  const updatedUser = users.value.find((u) => u.id === currentUser.value.id);
  if (updatedUser) {
    updatedUser.name = currentUser.value.name;
    updatedUser.email = currentUser.value.email;
  }
  isEditing.value = false;
};

// 刪除用戶
const removeUser = (user: User) => {
  const index = users.value.indexOf(user);
  if (index > -1) {
    users.value.splice(index, 1);
  }
};

// 加載用戶資料
fetchUsers();
</script>
