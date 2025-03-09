/**
 * ModifyMenu Component
 * 
 * This component displays a list of menu items and allows users to modify or delete them.
 * It fetches menu items from the server and enables deletion with real-time updates.
 * 
 * Features:
 * - Displays menu items with their details.
 * - Provides an "Edit" button to update a menu item.
 * - Allows users to delete a menu item with a confirmation message.
 * - Uses context to manage menu data.
 * - Uses `axios` for API calls and `react-toastify` for notifications.
 */

import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./ModifyMenu.css";
import { StoreContext } from "../../../context/storeContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const ModifyMenu = ({ url, fetchMenuItems }) => {
  // Accessing menuItems from the context
  const { menuItems } = useContext(StoreContext);

  /**
   * Handles deletion of a menu item.
   * Sends a DELETE request to the backend and updates the menu list.
   * @param {string} id - The ID of the menu item to be deleted.
   */
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${url}/api/menu/removeMenu/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchMenuItems(); // Refresh the menu list after successful deletion
      } else {
        toast.error("Failed to delete item. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to delete item. Please try again.");
    }
  };

  const {user}=useAuth()

  /**
   * Fetch menu items when the component mounts.
   */
  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="modify-menu">
      <h2>Edit Menu</h2>

      {/* Menu List */}
      <div className="menu-list">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-item">
            {/* Item Image */}
            <img src={`${url}/images/${item.image}`} alt={item.name} />

            {/* Item Details */}
            <div className="menu-item-info">
              <p>{item.name}</p>
              <p className="menu-item-desc">{item.description}</p>
              <p className="modify-item-price">Rs.{item.price}</p>
            </div>

            {/* Action Buttons */}
            <div className="buttons">
              {/* Edit Button - Navigates to the Edit Page */}
              <NavLink
                to={`/dashboard/editItem/${item._id}`}
                state={{ itemData: item }}
                className="edit-button"
              >
                Edit
              </NavLink>

              {/* Delete Button - Deletes the Menu Item */}
             {user?.role==='admin' && <button onClick={() => handleDelete(item._id)} className="delete-button">
                Delete
              </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModifyMenu;
