Vue.component('faq-list-item', {
  props: ['item'],
  data: () => {
    return {
      open: false
    }
  },
  methods: {
    toggle () {
      this.open = !this.open
    }
  },
  template: `
    <div v-on:click="toggle" class="flex justify-between cursor-pointer">
      <div>
        <h3 class="text-5xl font-bold">{{ item.title }}</h3>
        <p v-if="open" class="text-3xl mt-8">
          {{ item.body }}
        </p>
      </div>
      <div class="text-5xl font-bold ml-8">
        <span v-if="!open">+</span>
        <span v-if="open">-</span>
      </div>
    </div>
  `
})

Vue.component('app-root', {
  data: () => {
    return {
      faqlist: [
        { title: 'What is PINT?', body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' },
        { title: 'How to stake?', body: '' },
        { title: 'Is PINT a stable coin?', body: '' },
        { title: 'Where can I purchase PINT?', body: '' },
        { title: 'What is a coin?', body: '' },
      ]
    }
  },
  template: `
    <div class="flex flex-col xl:flex-row">
      <!-- SIDE NAVIGATION -->
      <nav class="h-20 w-full xl:h-auto xl:min-h-screen xl:w-24 bg-gray-300 flex xl:flex-col items-center shadow-lg fixed top-0 left-0">
        <div
          class="ml-4 xl:ml-0 xl:mt-4 w-16 h-16 text-5xl border-8 flex items-center justify-center pt-1 leading-1 font-bold rounded-full border-solid border-black">
          P
        </div>

        <div class="xl:mt-8 flex flex-grow xl:flex-col xl:max-h-screen justify-around xl:justify-start mx-auto">
          <div class="py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 xl:ml-0 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>

          <div class="py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 xl:ml-0 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>

          <div class="py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 xl:ml-0 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <div class="py-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="ml-4 xl:ml-0 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </nav>

      <!-- MAIN -->
      <main class="flex-grow mt-20 xl:mt-0 xl:ml-24">
        <!-- HEADER -->
        <header class="mt-32 text-center flex flex-col items-center">
          <h1 style="font-size: 12rem; line-height: 1;" class="border-8 border-solid border-black p-4">
            PINT
          </h1>
          <p class="text-5xl mt-12">
            Own Your Play
          </p>
        </header>

        <!-- CARDS -->
        <section class="mt-36 space-y-16 xl:space-y-0 xl:space-x-16 px-12 flex flex-col xl:flex-row justify-between max-w-screen-2xl mx-auto">
          <div v-for="x in [1, 2, 3]" class="px-8 py-6 bg-gray-200 rounded-lg shadow-xl">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <h3 class="text-3xl font-bold mt-4">Stake PINT. Earn fees</h3>
            <p class="mt-2 text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <div class="mt-4 text-lg flex justify-end">
              <div>Stake PINT</div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </section>

        <!-- TIRED OF LOSING -->
        <section class="text-center max-w-screen-2xl mx-auto my-36 px-12">
          <h2 class="font-bold text-7xl">Tired of Losing to the House?</h2>
          <p class="mt-16 text-3xl xl:text-4xl leading-relaxed">
            Tired of losing to the house?
            With PINT you are the house.
            Stake PINT tokens to receive userfees from When Rug
            and future pub.finance ecosystem products.
            Use your staking weight to govern the future of the product
            and direct the use of the Community Governed Warchest.
            Fair launch, fair owndership, fair play--Grab a pint.
          </p>
          <button class="mt-16 rounded-full bg-gray-200 text-3xl px-16 py-5">
            Call to Action
          </button>
        </section>

        <!-- ABOUT PINT -->
        <section class="max-w-screen-2xl mx-auto my-36 px-12">
          <div class="flex flex-col-reverse xl:flex-row">
            <div class="flex-grow mt-24">
              <h2 class="font-bold text-7xl">About PINT</h2>
              <p class="mt-16 text-4xl leading-relaxed">
                PINT launched as a standard fair-launch farming coin
                in September 2020. Through a small unstaking tax on our upwards
                of $5,000,000 farming TVL, PINT raised a modest Community-Governed Warchest (CGW)
                which is being used to fund development of innovative and engaging products
                for the pub.finance ecosystem.
              </p>

              <div class="flex space-x-8">
                <button class="mt-16 rounded-full bg-gray-200 text-xl px-8 py-5 flex justify-between items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="ml-4 font-semibold">Learn More</span>
                </button>

                <button class="mt-16 rounded-full border-4 border-solid border-gray-200 text-xl px-8 py-5 flex justify-between items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span class="ml-4 font-semibold">Join Chat</span>
                </button>
              </div>
            </div>
            <div class="mx-auto xl:ml-24">
              <div
                style="font-size: 20rem; width: 30rem; height: 30rem; border-width: 4rem"
                class="flex items-center justify-center pt-4 leading-1 font-bold rounded-full border-solid border-black">
                P
              </div>
            </div>
          </div>
        </section>

        <!-- FAQ -->
        <section class="max-w-screen-2xl mx-auto my-36 px-12">
          <div class="text-center">
            <h2 class="font-bold text-7xl leading-tight">Frequently Asked Questions</h2>
            <p class="text-4xl mt-12">
              To learn more about PINT, check out the
              <a href="#" class="text-gray-400">FAQ page</a>
            </p>
          </div>

          <div class="max-w-screen-xl space-y-10 mx-auto mt-16">
            <faq-list-item
              v-for="item in faqlist"
              v-bind:item="item"
              v-bind:key="item.title">
            </faq-list-item>
          </div>
        </section>

        <!-- BLOG -->
        <section class="max-w-screen-2xl mx-auto my-36 px-12">
          <div class="text-center">
            <h2 class="font-bold text-7xl">Blog</h2>
          </div>

          <div class="space-y-16 xl:space-y-0 xl:space-x-16 flex flex-col xl:flex-row justify-center mt-16 px-8 xl:px-0">
            <div v-for="x in [1, 2, 3]" class="xl:w-1/4 px-8 py-6 bg-gray-200 rounded-lg shadow-xl flex xl:flex-col">
              <div class="flex justify-center items-center py-8">
                <div class="text-5xl leading-none border-8 border-solid border-black p-4">
                  PINT
                </div>
              </div>

              <div class="ml-8 xl:ml-0">
                <div class="text-2xl xl:text-base">Article</div>
                <div class="font-bold text-4xl xl:text-xl">Title of Article</div>
                <p class="xl:text-base text-2xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="space-y-4 text-center text-xl h-96 bg-gray-200 flex flex-col items-center justify-center px-12">
          <div class="flex space-x-4">
            <div style="border-width: 3px;" class="border-solid border-black p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div style="border-width: 3px;" class="border-solid border-black p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <div style="border-width: 3px;" class="border-solid border-black p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div style="border-width: 3px;" class="border-solid border-black p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
          </div>
          <div>
            Terms | Privacy
          </div>
          <div>
            &#169; 2021 Pub Finance. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  `
})

new Vue({ el: '#app' })
