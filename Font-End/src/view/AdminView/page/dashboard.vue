<template>
  <div class="grid grid-cols-4 gap-10">
    <div
      class="bg-white flex px-5 pt-8 pb-7 shadow rounded-2xl flex-col items-center justify-center"
    >
      <i
        class="mdi mdi-thermometer bg-primary text-white rounded-2xl text-5xl p-5"
      ></i>
      <div class="flex gap-1 mt-2">
        <h1 class="text-2xl font-bold">20</h1>
        <i class="mdi mdi mdi-temperature-celsius"></i>
      </div>
      <p class="text-gray-400">อุณหภูมิ</p>
      <div class="divider w-[50%] mx-auto my-1"></div>
      <p class="text-sm text-red-400">กำลังเชื่อมต่อ</p>
    </div>
    <div
      class="bg-white flex px-5 pt-8 pb-7 shadow rounded-2xl flex-col items-center justify-center"
    >
      <i
        class="mdi mdi-water bg-primary text-white rounded-2xl text-5xl p-5"
      ></i>
      <div class="flex gap-1 mt-2">
        <h1 class="text-2xl font-bold">20</h1>
        <p>%</p>
      </div>
      <p class="text-gray-400">ความชื้น</p>
      <div class="divider w-[50%] mx-auto my-1"></div>
      <p class="text-sm text-red-400">กำลังเชื่อมต่อ</p>
    </div>
    <div
      class="bg-white flex px-5 pt-8 pb-7 shadow rounded-2xl flex-col col-span-2"
    >
      <div class="flex justify-between">
        <div class="flex gap-1 items-center">
          <i class="mdi mdi-account-group text-2xl"></i>
          <p class="text-xl font-medium">Users</p>
        </div>
        <button class="btn btn-primary btn-outline rounded-2xl">
          VIEW ALL
        </button>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <tbody>
            <tr>
              <td>
                <div class="flex flex-col">
                  <h1 class="text-lg font-medium">PHASFSA</h1>
                  <div class="text-sm text-gray-400">afjiopaj@agjfia.com</div>
                </div>
              </td>
              <td>
                <div class="text-gray-500 text-end">Created at: 20</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="flex flex-col">
                  <h1 class="text-lg font-medium">PHASFSA</h1>
                  <div class="text-sm text-gray-400">afjiopaj@agjfia.com</div>
                </div>
              </td>
              <td>
                <div class="text-gray-500 text-end">Created at: 20</div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="flex flex-col">
                  <h1 class="text-lg font-medium">PHASFSA</h1>
                  <div class="text-sm text-gray-400">afjiopaj@agjfia.com</div>
                </div>
              </td>
              <td>
                <div class="text-gray-500 text-end">Created at: 20</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
        <button class="btn btn-primary btn-outline rounded-2xl">
          VIEW ALL
        </button>
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
                <div class="flex">
                  <p>อุณหภูมิ: 20</p>
                  <i class="mdi mdi-temperature-celsius"></i>
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
