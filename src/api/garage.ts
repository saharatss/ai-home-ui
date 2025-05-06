import { addToast } from "@heroui/react";


export const fetchGarages = async ({
  filter,
}:{
  filter?: Record<string, unknown>,
}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/garages/list/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filter),
      credentials: 'include',
    });
    return (await response.json());
  } catch (error) {
    console.warn('Error fetching garages', error);
    addToast({
      title: "Error",
      description: "Error fetching garages",
      color: "danger",
    });
    return null;
  };
}

const GarageAPI = {
  fetchGarages,
};

export default GarageAPI;