<template>
  <v-container class="mt-6 footer_lks">
    <v-row>
      <v-col cols="12" sm="12" md="3">
        <h2 class="footer_title">About {{ footerData?.company_name }}</h2>
        <p
          class="footer_paragraph"
          style="margin-bottom: 16px; margin-top: 34px"
        >
          {{ footerData?.company_name + " is a " + appDetails1?.app_detail }}
        </p>
        <ul class="footer_social">
          <li>
            <v-icon
              color="#FA2964"
              size="20"
              class="mr-2 mdi mdi-map-marker"
              aria-hidden="true"
            />
            {{ footerData?.location }}
          </li>
          <li>
            <v-icon
              color="#FA2964"
              size="20"
              class="mr-2 fa fa-phone"
              aria-hidden="true"
            />
            {{ footerData?.mobile_number }}
          </li>
          <li>
            <v-icon color="#FA2964" size="20" class="mr-2 fab fa-whatsapp" />
            {{ footerData?.whats_app }}
          </li>
          <li>
            <v-icon
              color="#FA2964"
              size="20"
              class="mr-2 fa fa-envelope"
              aria-hidden="true"
            />
            <a :href="`mailto:${footerData?.email_id}`">{{
              footerData?.email_id
            }}</a>
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <h2 class="footer_title" style="margin-bottom: 16px">Quick links</h2>
        <ul class="footer_links" style="margin-top: 37px">
          <li class="text-blue-accent-4">
            <img src="@/assets/links-arrow.svg" height="12" />
            Merchants - Send Inquiry
          </li>
          <li class="text-blue-accent-4">
            <img src="@/assets/links-arrow.svg" height="12" />
            Driver Partners - Deliver for us
          </li>
          <li class="text-blue-accent-4">
            <img src="@/assets/links-arrow.svg" height="12" />
            All Promotions
          </li>
          <li class="text-blue-accent-4">
            <img src="@/assets/links-arrow.svg" height="12" />
            All Malls
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <h2 class="footer_title">Our Apps</h2>
        <v-row>
          <v-col cols="6">
            <ul class="footer_links" style="margin-top: 37px">
              <li class="text-blue-accent-4">
                <img src="@/assets/links-arrow.svg" height="12" />
                Discount
              </li>
              <li class="text-blue-accent-4">
                <img src="@/assets/links-arrow.svg" height="12" />
                Preference
              </li>
              <li class="text-blue-accent-4">
                <img src="@/assets/links-arrow.svg" height="12" />
                Meal Promos
              </li>
              <li class="text-blue-accent-4">
                <img src="@/assets/links-arrow.svg" height="12" />
                Days of Week
              </li>
            </ul>
          </v-col>
          <v-col cols="6">
            <ul class="footer_links" style="margin-top: 37px">
              <li class="text-blue-accent-4">
                <img src="@/assets/links-arrow.svg" height="12" />
                Category
              </li>
              <li class="text-blue-accent-4">
                <img src="@/assets/links-arrow.svg" height="12" />
                Voucher Promos
              </li>
              <li class="text-blue-accent-4">
                <img src="@/assets/links-arrow.svg" height="12" />
                People Promos
              </li>
              <li class="text-blue-accent-4">
                <img src="@/assets/links-arrow.svg" height="12" />
                Other Types
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="3">
        <h5 v-if="isSmall" class="font-weight-light mt-2 mb-4" style="margin-bottom: 16px; text-align: center;" >
          Experience Mall-e on your Mobile
        </h5>
        <h5 v-if="!isSmall" class="font-weight-light mt-10" style="margin-bottom: 16px;" >
          Experience Mall-e on your Mobile
        </h5>
        <div class="d-flex w-100 justify-center">
          <v-btn
          variant="text"
          class="p-0"
          >
          <img height="35" style="border-radius: 10px;" src="@/assets/images/play-store.jpg" />
          </v-btn>
          <v-btn
          
          variant="text"
          class="p-0"
          >
          <img height="35" style="border-radius: 10px;" src="@/assets/images/app-store.jpg" />
          </v-btn>
        </div>
        <!-- <input class="footer_input" placeholder="Type your email" /> -->
        <!-- <div class="footer-btn-cont">
          <v-btn
            class="footer-btn"
            style="
              width: inherit;
              border-radius: 0 !important;
              margin-top: 16px;
              background: #00cdcd;
              color: white;
            "
          >
            <span>Get started</span>
          </v-btn>
          <div class="footer-btn-hover" />
        </div> -->
      </v-col>
    </v-row>
  </v-container>

  <v-footer
    class="bg-black text-center justify-center footer__content"
    :class="{ 'mb-16 pb-4': isSmall }"
  >
    <v-spacer />

    <div class="footer_text">
      {{ footerData.copyright }}
    </div>
    <div style="display: flex; justify-content: center">
      <v-btn
        :href="footerData.facebook"
        variant="text"
        color="#FA2964"
        icon="mdi-facebook"
      />
      <v-btn
        :href="footerData.twitter"
        variant="text"
        color="#FA2964"
        icon="mdi-twitter"
      />
      <v-btn
        :href="footerData.instagram"
        variant="text"
        color="#FA2964"
        icon="mdi-instagram"
      />
      <v-btn
        :href="footerData.youtube"
        variant="text"
        color="#FA2964"
        icon="mdi-youtube"
      />
    </div>
  </v-footer>
  <a
  onclick='window.scrollTo({top: 0, behavior: "smooth"});'
  class="go-up px-0 py-2"
  style="display: inline; border: 1px solid rgba(0, 0, 0, 0.3);"
>
  <i class="fa fa-long-arrow-up" aria-hidden="true"></i>
</a>

  <div
    v-if="isSmall"
    class="cart-mobile d-flex align-center justify-space-between px-4 align-content-center"
  >
    <div
      class="d-flex flex-column align-center py-2 pb-4 px-2 active-menu"
      style="gap: 5px"
    >
      <v-icon class="cart-title-icon" size="40" color="#36454F">
        mdi mdi-home
      </v-icon>
      <span>Home</span>
    </div>
    <div
      class="d-flex flex-column align-center py-2 pb-4 px-2"
      style="gap: 5px"
      @click="openSearch"
    >
      <v-icon class="cart-title-icon" size="40" color="#36454F">
        mdi mdi-magnify
      </v-icon>
      <span>Search</span>
    </div>
    <div
      class="d-flex flex-column align-center py-2 pb-4 px-2"
      style="gap: 5px"
    >
      <v-icon class="cart-title-icon" size="40" color="#36454F">
        mdi mdi-share-outline
      </v-icon>
      <span>Share</span>
    </div>
    <div
      class="d-flex flex-column align-center py-2 pb-4 px-2"
      style="gap: 5px"
    >
      <v-icon class="cart-title-icon" size="40" color="#36454F">
        mdi mdi-account-outline
      </v-icon>
      <span>Account</span>
    </div>
  </div>
</template>

<script>
import axios from "@/util/axios";
import app from "@/util/eventBus";
export default {
  // eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
  name: "Footer",
  data() {
    return {
      categoryCard: [],
      appDetails1: {
        app_detail: "",
      },
      appDetails2: null,
      footerData: {
        company_name: "",
        location: "",
        mobile_number: "",
        whats_app: "",
        email_id: "",
        copyright: "",
        facebook: "",
        twitter: "",
        instagram: "",
        youtube: "",
      },
      screenWidth: window.innerWidth,
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
  },
  mounted() {
    this.getAppContact();
    this.getAppDetails1();
    this.getAppDetails2();
  },
  methods: {
    openSearch() {
      app.config.globalProperties.$eventBus.$emit("openSearch");
    },
    goToTrending() {
      app.config.globalProperties.$eventBus.$emit("scrollToCardSection");
    },
    getAppDetails1() {
      // this.isLoading = true;
      axios
        .get(`/app/details/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          this.appDetails1.app_detail = data.app_detail || "";
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      // .finally(() => {
      //   this.isLoading = false;
      // });
    },
    getAppDetails2() {
      // this.isLoading = true;
      axios
        .get(`/categories/active-website/app/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          // this.appDetails = data.map((item) => {
          //   return {
          //     ...item,
          //     categoryId: item.category_id || 0,
          //     categoryName: item.category_name || '',
          //     description: item.description || '',
          //     image: item.image || '',
          //     slug: item.slug || '',
          //   };
          // })[0];
          this.categoryCard = data.map((item) => {
            return {
              id: item.category_id || 0,
              img: this.$fileURL + item.image || "",
              title: item.category_name || "",
            };
          });
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      // .finally(() => {
      //   this.isLoading = false;
      // });
    },
    getAppContact() {
      // this.isLoading = true;
      axios
        .get(`/app/contact/${this.$appId}`)
        .then((response) => {
          const data = response.data.data;
          this.footerData = {
            company_name: data.company_name || "",
            location: data.location || "",
            mobile_number: data.mobile_number || "",
            whats_app: data.whats_app || "",
            email_id: data.email_id || "",
            copyright: data.copyright || "",
            facebook: data.facebook || "",
            twitter: data.twitter || "",
            instagram: data.instagram || "",
            youtube: data.youtube || "",
          };
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
      // .finally(() => {
      //   this.isLoading = false;
      // });
    },
  },
};
</script>

<style scoped>
.our-apps {
  position: relative;
  overflow: hidden;
}
.our-apps-img {
  max-width: 100%;
  transition: all 0.3s;
  display: block;
  width: 100%;
  height: auto;
  transform: scale(1);
}

.our-apps:hover .our-apps-img {
  transform: scale(1.2);
}
.footer-btn-cont {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.footer-btn {
  width: 100%;
  height: 40px;
}

.footer-btn span {
  z-index: 1000;
}
.footer-btn-hover {
  position: absolute;
  border-radius: 50%;
  bottom: -40px;
  height: 40px;
  width: 100%;
  background: #002e41;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.footer-btn-cont:hover .footer-btn-hover {
  bottom: 0px;
  border-radius: 0px;
}

.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 0;
  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

.cart-mobile {
  position: fixed;
  width: 100%;
  bottom: 0;
  font-size: 14px;
  font-weight: 700;
  background: #fff;
  color: #36454f;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 99999;
  line-height: 0;
}

.active-menu {
  border-top: 4px solid yellow;
}

.go-up {
  position: fixed;
  bottom: 5.7rem;
  z-index: 99999;
  right: 1rem;
  font-size: 1.5rem;
  background: transparent;
  color: rgba(0, 0, 0, 0.3) !important;
  border-radius: 5px;
  text-decoration: none;
  line-height: 0;
  display: none;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.go-up:hover,
.go-up:focus {
  outline: 0;
  text-decoration: none;
  color: #fff;
}

@keyframes skeleton {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
