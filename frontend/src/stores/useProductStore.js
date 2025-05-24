import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
  // Products state
  products: [],
  loading: false,
  error: null,

  // Form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetFormData: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      const response = await axios.post(`${BASE_URL}/api/products`, formData);

      if (response.status === 201) {
        await get().fetchProducts();
        get().resetFormData();
        toast.success("Product added successfully.");
      }

      // Close the modal
      document.getElementById("add-product-modal").close();
    } catch (error) {
      console.log("Error in adding product:", error);
      toast.error("Something went wrong.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
      get().resetFormData();
    } catch (error) {
      if (error.status === 429) {
        set({ error: "Rate limit exceeded" });
      } else {
        set({ error: "Something went wrong." });
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.delete(`${BASE_URL}/api/products/${id}`);
      if (response.status === 200) {
        set((prev) => ({
          products: prev.products.filter((product) => product.id !== id),
        }));
      }
      toast.success("Product deleted successfully.");
    } catch (error) {
      console.log("Error in deleting product:", error);
      toast.error("Something went wrong.");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);

      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (error) {
      console.log("Error in fetching product: ", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });

    try {
      const { formData } = get();

      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );

      if (response.status === 200) {
        set({ currentProduct: response.data.data });
        toast.success("Product updated successfully");
      }
    } catch (error) {
      console.log("Error in updating product: ", error);
      toast.error("Something went wrong.");
    } finally {
      set({ loading: false });
    }
  },
}));
