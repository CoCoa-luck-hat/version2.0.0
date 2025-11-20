<template>
  <div class="grid grid-cols-4 gap-10">
    <div
      class="bg-white flex px-10 pt-8 pb-7 shadow rounded-2xl flex-col col-span-4"
    >
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="flex gap-1 items-center">
            <i class="mdi mdi-account-group text-2xl"></i>
            <p class="text-xl font-medium">Users Table</p>
          </div>
          <p class="text-sm text-gray-400">All 20 Users</p>
        </div>
      </div>
      <div class="overflow-x-auto mt-4">
        <table class="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Report</th>
              <th>Created At</th>
              <th class="text-center">Tool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="flex flex-col">
                  <h1 class="text-lg font-medium">PHASFSA</h1>
                  <div class="text-sm text-gray-400">afjiopaj@agjfia.com</div>
                </div>
              </td>
              <td>
                <p>30 Report</p>
              </td>
              <td>
                <p>20-09-2549</p>
              </td>
              <td >
                <div class="flex justify-center gap-2 font-medium">
                  <p class="text-red-500">Delete</p>
                  <p class="text-blue-500">Edit</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
