<template>
  <div class="zipcode-selector">
    <div class="form-group">
      <label for="zipcode">郵遞區號</label>
      <input
        id="zipcode"
        class="form-control"
        v-model="zipcode"
        placeholder="輸入郵遞區號"
        @input="onZipcodeInput"
      />
    </div>
    <div class="form-group">
      <label for="city">縣市</label>
      <select
        id="city"
        class="form-control"
        v-model="selectedCity"
        @change="onCityChange"
      >
        <option value="">請選擇縣市</option>
        <option v-for="city in cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="district">區域</label>
      <select
        id="district"
        class="form-control"
        v-model="selectedDistrict"
        @change="onDistrictChange"
      >
        <option value="">請選擇區域</option>
        <option v-for="district in filteredDistricts" :key="district">
          {{ district }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import zipcodeData from "@/assets/zipcode-data.json";

export default {
  name: "ZipcodeSelector",
  data() {
    return {
      zipcode: "",
      selectedCity: "",
      selectedDistrict: "",
      zipcodeData: {},
      cities: [],
      districtMap: {},
    };
  },
  computed: {
    filteredDistricts() {
      return this.selectedCity ? this.districtMap[this.selectedCity] : [];
    },
  },
  methods: {
    onZipcodeInput() {
      const data = this.zipcodeData[this.zipcode];
      if (data) {
        this.selectedCity = data.city;
        this.selectedDistrict = data.district;
      } else {
        this.selectedCity = "";
        this.selectedDistrict = "";
      }
    },
    onCityChange() {
      this.selectedDistrict = "";
      this.zipcode = "";
    },
    onDistrictChange() {
      const entry = Object.entries(this.zipcodeData).find(
        ([zipcode, data]) =>
          data.city === this.selectedCity &&
          data.district === this.selectedDistrict
      );
      if (entry) {
        this.zipcode = entry[0];
      } else {
        this.zipcode = "";
      }
    },
    initializeData() {
      this.zipcodeData = zipcodeData.reduce((acc, item) => {
        acc[item.zipcode] = { city: item.city, district: item.district };
        return acc;
      }, {});

      this.cities = [...new Set(zipcodeData.map((item) => item.city))];

      this.districtMap = this.cities.reduce((acc, city) => {
        acc[city] = zipcodeData
          .filter((item) => item.city === city)
          .map((item) => item.district);
        return acc;
      }, {});
    },
  },
  mounted() {
    this.initializeData();
  },
};
</script>

<style scoped>
.zipcode-selector {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.zipcode-selector .form-group {
  margin-bottom: 15px;
}

.zipcode-selector label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  color: #333;
}

.zipcode-selector .form-control {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.zipcode-selector .form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
}

.zipcode-selector select.form-control {
  background-color: #fff;
}

.zipcode-selector input.form-control {
  background-color: #f9f9f9;
}

.zipcode-selector .form-control::placeholder {
  color: #adb5bd;
}
</style>
