<template>
  <div class="grid grid-cols-4 gap-10">
    <div
      class="bg-white flex px-10 pt-8 pb-7 shadow rounded-2xl flex-col col-span-4"
    >
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="flex gap-1 items-center">
            <i class="mdi mdi-account-group text-2xl"></i>
            <p class="text-xl font-medium">Reports</p>
          </div>
          <p class="text-sm text-gray-400">All 20 Reports</p>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-10 mt-5">
        <div class="card shadow">
          <figure class="max-h-[200px] object-cover">
            <img src="/image/TEST.jpg" alt="" />
          </figure>
          <div class="card-body gap-0">
            <p class="text-sm text-gray-300">Report #1</p>
            <div class="flex items-center">
              <h1 class="text-2xl font-medium">Day 1</h1>
              <p class="text-end text-gray-500">Form: Cocoa</p>
            </div>
            <p class="line-clamp-2 text-gray-400 my-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
              asperiores dolore iste dicta adipisci ducimus tenetur tempore
              doloribus beatae laudantium, possimus odio soluta repellendus
              voluptate. Aliquam reprehenderit distinctio illum ullam.
            </p>
            <div class="flex justify-between items-end mt-5">
              <button class="btn btn-primary btn-outline rounded-xl btn-sm">
                View More
              </button>
              <div class="flex flex-col text-gray-500 text-[10px]">
                <div class="flex ">
                  <p>อุณหภูมิ: 20</p>
                  <i class="mdi mdi-temperature-celsius "></i>
                </div>
                <div class="flex">
                  <p>ความชื้น: 20</p>
                  <p>%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
