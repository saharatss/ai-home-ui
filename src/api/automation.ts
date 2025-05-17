import { Automation } from "@/types/automation";
import { addToast } from "@heroui/react";

export const fetchAutomations = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/automation/user/${localStorage.getItem('userId')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) {
      console.warn('Error fetchAutomations', response.statusText);
      addToast({
        title: "Error",
        description: "Error fetching automations",
        color: "danger",
        timeout: 3000,
      });
      return [];
    }
    const json = await response.json();
    json.forEach((automation: {
      config: string
      trigger: string
      condition: string
      action: string
    }) => {
      automation.config    = JSON.parse(automation.config);
      automation.trigger   = JSON.parse(automation.trigger);
      automation.condition = JSON.parse(automation.condition);
      automation.action    = JSON.parse(automation.action);
    });
    return json;
  } catch (error) {
    console.warn('Error fetching automations', error);
    addToast({
      title: "Error",
      description: "Error fetching automations",
      color: "danger",
      timeout: 3000,
    });
    return null;
  };
}

export const createAutomation = async (automation: Automation) => {
  try {
    automation.userId = localStorage.getItem('userId') || '';
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/automation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(automation),
      credentials: 'include',
    });
    if (!response.ok) {
      console.warn('Error createAutomation', response.statusText);
      addToast({
        title: "Error",
        description: "Error creating automation",
        color: "danger",
      });
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn('Error creating automation', error);
    addToast({
      title: "Error",
      description: "Error creating automation",
      color: "danger",
      timeout: 3000,
    });
    return null;
  };
}

export const deleteAutomation = async (automationId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/automation/${automationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    if (!response.ok) {
      console.warn('Error deleteAutomation', response.statusText);
      addToast({
        title: "Error",
        description: "Error deleting automation",
        color: "danger",
      });
      return null;
    }
    return true;
  } catch (error) {
    console.warn('Error deleting automation', error);
    addToast({
      title: "Error",
      description: "Error deleting automation",
      color: "danger",
      timeout: 3000,
    });
    return null;
  }
};

export const updateAutomation = async (automation: Automation) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/api/v1/automation/${automation.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        ...automation,
        trigger: JSON.stringify(automation.trigger),
        condition: JSON.stringify(automation.condition),
        action: JSON.stringify(automation.action),
        config: JSON.stringify(automation.config),
      }),
    });
    if (!response.ok) {
      console.warn('Error updateAutomation', response.statusText);
      addToast({
        title: "Error",
        description: "Error updating automation",
        color: "danger",
      });
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn('Error updating automation', error);
    addToast({
      title: "Error",
      description: "Error updating automation",
      color: "danger",
      timeout: 3000,
    });
    return null;
  }
};

const AutomationAPI = {
  fetchAutomations,
  createAutomation,
  deleteAutomation,
  updateAutomation,
};

export default AutomationAPI;