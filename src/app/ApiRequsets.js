import axios from "axios";

const API_URL = "https://hospital111.runasp.net/api";

export const UserType = {
  DOCTOR: "Doctor",
  PATIENT: "Patient",
  RECEPTION: "Reception",
  HR: "Hr",
  NURSE: "Nurse",
};

// الدوال الأساسية للمستخدمين
export const fetchUsers = async (userType, options = {}) => {
  try {
    const params = { userType, ...options };
    const response = await axios.get(`${API_URL}/Appuser/type`, { params });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch ${userType} users: ${error.message}`);
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/Appuser/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch user with ID ${userId}: ${error.message}`);
  }
};
export const registerHR = async (hrData) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/register_hr`, hrData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to register HR: ${error.message}`);
  }
};

// دوال الرواتب
export const fetchSalaryByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/Salary/${username}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch salary for ${username}: ${error.message}`);
  }
};

export const deleteSalaryByUsername = async (username) => {
  try {
    await axios.delete(`${API_URL}/Salary/${username}`);
  } catch (error) {
    throw new Error(
      `Failed to delete salary for ${username}: ${error.message}`
    );
  }
};

// دوال العيادات
export const fetchAllClinics = async () => {
  try {
    const response = await axios.get(`${API_URL}/Clinic`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch clinics: ${error.message}`);
  }
};

export const fetchAvailableDaysForClinic = async (clinicId) => {
  try {
    const response = await axios.get(
      `${API_URL}/Clinic/${clinicId}/available-days`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch available days for clinic ${clinicId}: ${error.message}`
    );
  }
};

// دوال مختصرة لأنواع المستخدمين
export const fetchDoctors = (options) => fetchUsers(UserType.DOCTOR, options);
export const fetchPatients = (options) => fetchUsers(UserType.PATIENT, options);
export const fetchReceptionists = (options) =>
  fetchUsers(UserType.RECEPTION, options);
export const fetchHR = (options) => fetchUsers(UserType.HR, options);
export const fetchNurses = (options) => fetchUsers(UserType.NURSE, options);

// عمليات CRUD العامة
export const deleteUser = async (userId) => {
  try {
    await axios.delete(`${API_URL}/Appuser/${userId}`);
  } catch (error) {
    throw new Error(`Failed to delete user: ${error.message}`);
  }
};
// تعديل مستخدم
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/Appuser/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};
// اضافه مرتب

export const addSalary = async (salaryData) => {
  try {
    const payload = {
      amount: parseFloat(salaryData.amount),
      paymentDate: new Date(salaryData.paymentDate).toISOString(),
      paymentMethod: salaryData.paymentMethod,
      status: salaryData.status,
      appUserId: salaryData.appUserId,
    };
    await axios.post(`${API_URL}/Salary`, payload);
  } catch (error) {
    throw new Error("Failed to add salary: " + error.message);
  }
};

// دالة لجلب جميع الرواتب
export const fetchAllSalaries = async () => {
  try {
    const response = await axios.get(`${API_URL}/Salary`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch salaries: ${error.message}`);
  }
};
// اضافه عياده
export const addNewClinic = async (clinicData) => {
  try {
    const response = await axios.post(`${API_URL}/Clinic`, clinicData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add clinic: ${error.message}`);
  }
};
// fetch clinic by id
export const fetchClinicById = async (clinicId) => {
  try {
    const response = await axios.get(`${API_URL}/Clinic/${clinicId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch clinic ${clinicId}: ${error.message}`);
  }
};
// التعديل علي عياده
export const updateClinic = async (clinicId, clinicData) => {
  try {
    const response = await axios.put(
      `${API_URL}/Clinic/${clinicId}`,
      clinicData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update clinic ${clinicId}: ${error.message}`);
  }
};
// مسح عياده
export const deleteClinic = async (clinicId) => {
  try {
    await axios.delete(`${API_URL}/Clinic/${clinicId}`);
  } catch (error) {
    throw new Error(`Failed to delete clinic ${clinicId}: ${error.message}`);
  }
};
// اضافه ايام للعياده
export const addAvailableDays = async (dayData) => {
  try {
    const response = await axios.post(`${API_URL}/Clinic/available-days`, [
      {
        clinicId: dayData.clinicId,
        dayOfWeek: dayData.dayOfWeek,
        startTime: dayData.startTime,
        endTime: dayData.endTime,
      },
    ]);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add available day: ${error.message}`);
  }
};

// الحصول على تفاصيل عيادة معينة
export const getClinicDetails = async (clinicId) => {
  try {
    const response = await axios.get(`${API_URL}/Clinic/${clinicId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch clinic details: ${error.message}`);
  }
};

// الحصول على الأيام المتاحة لعيادة معينة
export const getAvailableDaysForClinic = async (clinicId) => {
  try {
    const response = await axios.get(
      `${API_URL}/Clinic/${clinicId}/available-days`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch available days: ${error.message}`);
  }
};

// for the rooms
export const fetchAllRooms = async () => {
  try {
    const response = await axios.get(`${API_URL}/Room`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch rooms: ${error.message}`);
  }
};

export const fetchRoomById = async (roomId) => {
  try {
    const response = await axios.get(`${API_URL}/Room/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch room ${roomId}: ${error.message}`);
  }
};

export const addNewRoom = async (roomData) => {
  try {
    const response = await axios.post(`${API_URL}/Room`, roomData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to add room: ${error.message}`);
  }
};

export const updateRoom = async (roomId, roomData) => {
  try {
    const response = await axios.put(`${API_URL}/Room/${roomId}`, roomData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update room ${roomId}: ${error.message}`);
  }
};

export const deleteRoom = async (roomId) => {
  try {
    await axios.delete(`${API_URL}/Room/${roomId}`);
  } catch (error) {
    throw new Error(`Failed to delete room ${roomId}: ${error.message}`);
  }
};

// for the appointments
export const fetchAppointments = async () => {
  try {
    const response = await axios.get(`${API_URL}/Appointment`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch appointments: ${error.message}`);
  }
};

export const fetchAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/Appointment/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch appointment ${id}: ${error.message}`);
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/Appointment`,
      appointmentData
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create appointment: ${error.message}`);
  }
};

export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/Appointment/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to delete appointment ${id}: ${error.message}`);
  }
};

export const updateAppointmentStatus = async (id, newStatus) => {
  try {
    const response = await axios.get(`${API_URL}/Appointment/${id}`);
    const currentAppointment = response.data;

    const updatedAppointment = {
      ...currentAppointment,
      status: newStatus,
    };

    const updateResponse = await axios.put(
      `${API_URL}/Appointment/${id}`,
      updatedAppointment
    );
    return updateResponse.data;
  } catch (error) {
    throw new Error(`Failed to update appointment status: ${error.message}`);
  }
};
