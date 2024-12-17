<template>
  <q-page class="q-pa-md">
    <!-- 歡迎區塊 -->
    <q-banner class="q-mb-md" color="primary" text-color="white">
      <div class="text-h6">歡迎來到我們的系統！</div>
    </q-banner>

    <!-- 最新資訊區塊 -->
    <div class="q-mt-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">最新資訊</div>
          <q-separator />
          <q-list>
            <q-item v-for="news in newsList" :key="news.id" clickable>
              <q-item-section>
                <div class="text-body1">{{ news.title }}</div>
                <div class="text-caption">{{ news.date }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- 活動區域模塊 -->
    <div class="q-mt-md">
      <q-card v-for="event in events" :key="event.id" class="q-mb-md">
        <q-card-section>
          <div class="text-h6">{{ event.title }}</div>
          <q-separator />
          <div>
            <p>日期: {{ event.date }}</p>
            <p>描述: {{ event.description }}</p>
            <q-btn label="了解更多" color="primary" flat />
            <q-btn label="參加活動" color="secondary" flat />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import apiservice from "@/utils/ApiService";

interface News {
  id: number;
  title: string;
  date: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

interface NewsResponse {
  newsList: News[];
}

interface EventResponse {
  eventList: Event[];
}

export default defineComponent({
  setup() {
    const newsList = ref<News[]>([]);
    const events = ref<Event[]>([]);

    // 加載最新資訊
    const fetchNewsList = async () => {
      const data = await apiservice.fetchApiWithoutPromise<NewsResponse>(
        "/api/news.json"
      );
      if (data?.newsList) {
        newsList.value = data.newsList;
      }
    };

    // 加載活動資訊
    const fetchEventDetails = async () => {
      const data = await apiservice.fetchApiWithoutPromise<EventResponse>(
        "/api/events.json"
      );
      if (data?.eventList) {
        events.value = data.eventList;
      }
    };

    // 在組件掛載時加載資料
    fetchNewsList();
    fetchEventDetails();

    return {
      newsList,
      events,
    };
  },
});
</script>
