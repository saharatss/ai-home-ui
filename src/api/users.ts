import User from "@/types/user";
import { addToast } from "@heroui/react";

export const fetchUsers = async ({
  filter,
}:{
  filter?: Record<string, unknown>,
}): Promise<User[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/users/list/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter),
      credentials: 'include',
    });
    if (!response.ok) {
      console.warn('Error fetchUsers', response.statusText);
      addToast({
        title: "Error",
        description: "Error fetching users",
        color: "danger",
      });
      return [];
    }
    const json = await response.json();
    return json.users;
  } catch (error) {
    console.error('Error fetchUsers', error);
    return [];
  }
};

export const fetchDistinctUserRoles = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/users/roles/distinct/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      console.warn('Error fetchUsers', response.statusText);
      addToast({
        title: "Error",
        description: "Error fetching users",
        color: "danger",
      });
      return [];
    }
    const json = await response.json();
    const data: string[] = json.roles;
    return data;
  } catch (error) {
    console.error('Error fetchUsers', error);
    return [];
  }
};

const UserAPI = {
  fetchUsers,
  fetchDistinctUserRoles,
};

export default UserAPI;