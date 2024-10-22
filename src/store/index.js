// store.js
// import { createStore } from "vuex";
import { createStore } from "vuex";
import axios from "@/util/axios";

export default (app) =>
  createStore({
    state: {
      activeTag: null, // Tag yang aktif
      itemSelected: "---Select Country---",
      itemSelectedComplete: null,
      itemSelected2: "---Select City---",
      itemSelected2Complete: null,
      selectedTrending: "",
      latitude: "",
      longitude: "",
      country: [],
    },
    mutations: {
      setActiveTag(state, tag) {
        state.activeTag = tag; // Memperbarui tag yang aktif
      },
      setItemSelected(state, item) {
        state.itemSelected = item; // Memperbarui tag yang aktif
      },
      setItemSelectedComplete(state, item) {
        state.itemSelectedComplete = item; // Memperbarui tag yang aktif
      },
      setItemSelected2(state, item) {
        state.itemSelected2 = item; // Memperbarui tag yang aktif
      },
      setItemSelected2Complete(state, item) {
        state.itemSelected2Complete = item; // Memperbarui tag yang aktif
      },
      setSelectedTrending(state, item) {
        state.selectedTrending = item;
      },
      setCountry(state, item) {
        state.country = item;
      },
      setLongLat(state, item) {
        state.latitude = item.latitude;
        state.longitude = item.longitude;

        localStorage.setItem("latitude", item.latitude);
        localStorage.setItem("longitude", item.longitude);
      },
    },
    actions: {
      async getLongLat({ commit }) {
        if (navigator.geolocation) {
          try {
            navigator.geolocation.getCurrentPosition((position) => {
              if (position) {
                commit("setLongLat", {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              }
            });
          } catch (error) {
            throw error;
          }
        }
      },

      async setDefaultCountry({ commit, state }) {
        let link = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${state.latitude}&lon=${state.longitude}`;

        try {
          const dataCountry = await axios.get(link);

          console.log(dataCountry);
        } catch (error) {
          throw error;
        }
      },
      async getCountryMall({ commit, dispatch }) {
        let link = `/app-country-list/${app.config.globalProperties.$appId}`;

        try {
          await dispatch("getLongLat");

          const { data } = await axios.get(link);

          let allCountry = data.data.map((country) => {
            let obj = {
              ...country,
              id: country.country_id,
              title: country.country_name,
              count: country.property_count,
              oneCity: country.one_city == "Y" ? true : false,
              path: "#",
              flag: country.flag,
              cities: [],
            };

            return obj;
          });

          commit("setCountry", allCountry);

          await dispatch("setDefaultCountry");
        } catch (error) {
          throw error;
        }
      },
    },
  });
