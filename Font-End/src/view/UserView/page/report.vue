<script setup>
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToastStore } from "@/stores/toast";

const ToastStore = useToastStore();
const UserStore = useUserStore();

const SelectedReportToEdit = reactive({
  date: "",
  id: "",
  title: "",
  photo: "",
  oldphoto:'',
  message: "",
  temperature: "",
  humidity: "",
});
const IsPhoto = ref(false)

const Date = ref("");
const Title = ref("");
const Photo = ref(null);
const Message = ref("");
const Temperature = ref(0);
const Humidity = ref(0);
const fileInput = ref(null);

const ChangePhoto = (e) => {
  const flies = e.target.files;
  Photo.value = flies && flies[0] ? flies[0] : null;
};

const SummitReport = async () => {
  const form = new FormData();
  form.append("date", Date.value);
  form.append("title", Title.value);
  form.append("photo", Photo.value);
  form.append("message", Message.value);
  form.append("temperature", Temperature.value);
  form.append("humidity", Humidity.value);

  try {
    const response = await UserStore.CreateReport(form);
    ToastStore.pushToast("เพิ่มรายงานสำเร็จ", "alert-success");
    UserStore.LoadReportAll();

    Date.value = "";
    Title.value = "";
    Photo.value = null;
    Message.value = "";
    Temperature.value = 0;
    Humidity.value = 0;
    fileInput.value.value = "";
  } catch (error) {
    console.log(error);
  }
};

const openModal = (id) => {
  const dialog = document.getElementById(`my_report_${id}`);
  dialog.showModal();
};

const EditModal = (data) => {
  Object.assign(SelectedReportToEdit, {
    ...data,
    oldphoto:data.photo
  });
  console.log(SelectedReportToEdit);
  const dialog = document.getElementById(`my_edit_report`);
  dialog.showModal();
};

const ChangeEditPhoto = (e) => {
  const file = e.target.files;
  if (file && file[0]) {
    SelectedReportToEdit.photo = file && file[0];
    console.log(SelectedReportToEdit.photo)
    IsPhoto.value = true;
  }
};

const SummitEditReport = async () => {
  const Report = new FormData();
  Report.append("id", SelectedReportToEdit.id);
  Report.append("title", SelectedReportToEdit.title);
  Report.append("message", SelectedReportToEdit.message);
  if (IsPhoto.value) {
    Report.append("photo", SelectedReportToEdit.photo);
  }else{
    Report.append("oldphoto", SelectedReportToEdit.oldphoto);
  }
  try {
    const response = await UserStore.UpdateReport(Report);
    ToastStore.pushToast("แก้ไขสำเร็จ","alert-success");
    await UserStore.LoadReportAll();
  } catch (error) {
    console.log(error);
  }
};

const DeleteReport = async(id)=>{
  try{
    const response = await UserStore.DeleteReport(id)
    ToastStore.pushToast('ลบสำเร็จ','alert-success')
    await UserStore.LoadReportAll()
  }catch(error){
    console.log(error);
  }
}

onMounted(async() => {
  await UserStore.LoadReportAll();
});
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <div
      class="bg-white flex px-10 pt-8 pb-7 shadow rounded-2xl flex-col col-span-4"
    >
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="flex gap-1 items-center">
            <i class="mdi mdi-flag text-2xl"></i>
            <p class="text-xl font-medium">My Reports</p>
          </div>
          <p class="text-sm text-gray-400">
            All {{ UserStore.AllMyReport.length }} Reports
          </p>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-10 mt-5">
        <div
          class="card shadow"
          v-for="Report in UserStore.AllMyReport"
          :key="Report.id"
        >
          <figure class="max-h-[200px] object-cover">
            <img :src="'/upload/' + Report.photo" alt="" />
          </figure>
          <div class="card-body gap-0">
            <p class="text-sm text-gray-300">{{ Report.date }}</p>
            <div class="flex items-center">
              <h1 class="text-2xl font-medium">{{ Report.title }}</h1>
              <p class="text-end text-gray-500">Form: Me</p>
            </div>
            <p class="line-clamp-2 text-gray-400 my-1">
              {{ Report.message }}
            </p>
            <div class="flex justify-between items-end mt-5">
              <div class="flex flex-col gap-1">
                <div class="flex gap-2">
                  <button
                    class="btn btn-primary btn-outline rounded-xl btn-sm"
                    @click="openModal(Report.id)"
                  >
                    View More
                  </button>
                  <button
                    class="btn btn-info btn-outline rounded-xl btn-sm"
                    @click="EditModal(Report)"
                  >
                    Edit
                  </button>
                </div>
                <button class="btn btn-outline btn-error btn-sm rounded-2xl" @click="DeleteReport(Report.id)">
                  Delete
                </button>
              </div>
              <div class="flex flex-col text-gray-500 text-[10px]">
                <div class="flex">
                  <p>อุณหภูมิ: {{ Report.temperature }}</p>
                  <i class="mdi mdi-temperature-celsius"></i>
                </div>
                <div class="flex">
                  <p>ความชื้น: {{ Report.humidity }}</p>
                  <p>%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="btn btn-neutral btn-dash h-full flex flex-col"
          onclick="my_modal_0.showModal()"
        >
          <i class="mdi mdi-plus text-4xl"></i>
          <p class="text-xl">Create Report</p>
        </div>
      </div>
    </div>
  </div>

  <dialog id="my_modal_0" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box lg:max-w-sm">
      <h3 class="text-2xl font-bold text-center mb-4">New Report</h3>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">วันที่</legend>
        <input type="date" class="input outline-0" v-model="Date" />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">หัวข้อ</legend>
        <input
          type="text"
          class="input outline-0"
          placeholder="Type Title"
          v-model="Title"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">รูปภาพ</legend>
        <input
          type="file"
          class="file-input outline-0"
          placeholder="Type Title"
          @change="ChangePhoto"
          ref="fileInput"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">ข้อความ</legend>
        <textarea
          class="textarea h-24 rounded-2xl"
          placeholder="Type message"
          v-model="Message"
        ></textarea>
      </fieldset>
      <div class="flex gap-10">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">อุณหภูมิ</legend>
          <label class="input">
            <input type="text" class="grow" value="20" disabled />
            <i class="mdi mdi-temperature-celsius"></i>
          </label>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">อุณหภูมิ</legend>
          <label class="input">
            <input type="text" class="grow" value="20" disabled />
            <i class="mdi mdi-water"></i>
          </label>
        </fieldset>
      </div>

      <div class="modal-action">
        <button class="btn btn-primary btn-outline" @click="SummitReport()">
          Submit
        </button>
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>

  <dialog id="my_edit_report" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box lg:max-w-sm">
      <h3 class="text-2xl font-bold text-center mb-4">Edit Report</h3>
      <img
        :src="`/upload/${SelectedReportToEdit.photo}`"
        class="max-h-[200px] object-cover w-full rounded-2xl mb-2"
        alt=""
      />
      <fieldset class="fieldset">
        <legend class="fieldset-legend">วันที่</legend>
        <input
          type="date"
          class="input outline-0"
          v-model="SelectedReportToEdit.date"
          disabled
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">หัวข้อ</legend>
        <input
          type="text"
          class="input outline-0"
          placeholder="Type Title"
          v-model="SelectedReportToEdit.title"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">รูปภาพ</legend>
        <input
          type="file"
          class="file-input outline-0"
          placeholder="Type Title"
          @change="ChangeEditPhoto"
          ref="fileInput"
        />
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">ข้อความ</legend>
        <textarea
          class="textarea h-24 rounded-2xl"
          placeholder="Type message"
          v-model="SelectedReportToEdit.message"
        ></textarea>
      </fieldset>
      <div class="flex gap-10">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">อุณหภูมิ</legend>
          <label class="input">
            <input type="text" class="grow" value="20" disabled />
            <i class="mdi mdi-temperature-celsius"></i>
          </label>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">อุณหภูมิ</legend>
          <label class="input">
            <input type="text" class="grow" value="20" disabled />
            <i class="mdi mdi-water"></i>
          </label>
        </fieldset>
      </div>

      <div class="modal-action">
        <button class="btn btn-primary btn-outline" @click="SummitEditReport()">
          Submit
        </button>
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>

  <dialog
    v-for="Report in UserStore.AllMyReport"
    :id="`my_report_${Report.id}`"
    :key="Report.id"
    class="modal modal-bottom sm:modal-middle"
  >
    <div class="modal-box lg:max-w-sm">
      <figure class="object-cover">
        <img
          :src="'/upload/' + Report.photo"
          alt=""
          class="w-full max-h-[200px] object-cover"
        />
      </figure>
      <div class="card-body gap-0">
        <p class="text-sm text-gray-300">{{ Report.date }}</p>
        <div class="flex items-center">
          <h1 class="text-2xl font-medium">{{ Report.title }}</h1>
          <p class="text-end text-gray-500">Form: Me</p>
        </div>
        <p class="line-clamp-2 text-gray-400 my-1">
          {{ Report.message }}
        </p>
        <div class="flex justify-between items-end mt-5">
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
          <div class="flex flex-col text-gray-500 text-[10px]">
            <div class="flex">
              <p>อุณหภูมิ: {{ Report.temperature }}</p>
              <i class="mdi mdi-temperature-celsius"></i>
            </div>
            <div class="flex">
              <p>ความชื้น: {{ Report.humidity }}</p>
              <p>%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>
