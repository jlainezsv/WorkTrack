export interface EmployeeResponseDto {
  id: string;
  employeeCode: string;
  name: string;
  active: boolean;
  createdAt: string; // ISO string for HTTP transport
  photoUrl?: string;
}