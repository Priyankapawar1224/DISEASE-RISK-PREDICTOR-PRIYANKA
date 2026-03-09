const STORAGE_KEY = "system_notifications";

/* GET */

export const getNotifications = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* SAVE */

const saveNotifications = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/* ADD */

export const addNotification = (title, message, type) => {

  let notifications = getNotifications();

  const newNotification = {
    id: Date.now(),
    title,
    message,
    type,
    time: new Date().toLocaleString(),
    read: false,
    important: false
  };

  notifications.unshift(newNotification);

  saveNotifications(notifications);
};

/* UPDATE */

export const updateNotification = (id, title, message, type) => {

  const notifications = getNotifications();

  const updated = notifications.map(n =>
    n.id === id
      ? { ...n, title, message, type }
      : n
  );

  saveNotifications(updated);
};

/* DELETE */

export const deleteNotification = (id) => {

  const notifications = getNotifications();

  const filtered = notifications.filter(n => n.id !== id);

  saveNotifications(filtered);
};

/* IMPORTANT */

export const toggleImportant = (id) => {

  const notifications = getNotifications();

  const updated = notifications.map(n =>
    n.id === id
      ? { ...n, important: !n.important }
      : n
  );

  saveNotifications(updated);
};

/* MARK AS READ */

export const markAsRead = (id) => {

  const notifications = getNotifications();

  const updated = notifications.map(n =>
    n.id === id
      ? { ...n, read: true }
      : n
  );

  saveNotifications(updated);
};

/* CLEAR */

export const clearNotifications = () => {
  localStorage.removeItem(STORAGE_KEY);
};