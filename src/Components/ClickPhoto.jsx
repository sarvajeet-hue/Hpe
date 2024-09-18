import React, { useState } from "react";
import axios from "axios";
import { PrimaryButton } from "../Components/PrimaryButton/PrimaryButton";
import { apiKey } from "../apiKey";


export const ClickPhoto = () => {
  const [removedImg, setRemovedImg] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [finalOutput , setFinalOutput] = useState(null)

  const imgUrl = "https://www.shutterstock.com/shutterstock/photos/1554086789/display_1500/stock-photo-close-up-portrait-of-yong-woman-casual-portrait-in-positive-view-big-smile-beautiful-model-posing-1554086789.jpg"


  
  async function removeBackground(imgUrl) {
    

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };
    const body = {
      imageUrl: imgUrl, // Input image URL
      background: "https://images.unsplash.com/photo-1666389785855-a963e0519f18?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8anBnfGVufDB8fDB8fHww",
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/remove-background",
        body,
        { headers: headers }
      );

      console.log("response:", response);
      const orderId = response?.data?.body?.orderId;
      setOrderId(response?.data?.body?.orderId);

      orderStatus(orderId);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function orderStatus(orderId) {
    

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    };

    const body = {
      orderId: orderId, // Ensure that orderId is sent as an object
    };

    console.log("Order ID:", orderId);

    const pollOrderStatus = async (orderId) => {
      try {
        // Send request to check the order status
        const response = await axios.post(
          "http://localhost:5000/remove-background-with-orderId",
          body,
          { headers }
        );
        console.log("Response in order status:", response.data); // Log the response

        const status = response.data?.body?.status;
        // Extract the status from the response

        if (status === "init") {
          console.log("Order is still initializing... waiting...");
          // Wait for 5 seconds before checking again
          setTimeout(() => pollOrderStatus(orderId), 5000);
        } else if (status === "active") {
          console.log("Order is active! Processing complete.");
          setRemovedImg(response.data?.body?.output);
          
          // Handle the successful response here (e.g., update UI with the result)
        } else {
          console.log("Order status:", status);
          // Handle other possible statuses, if any
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
        if (error.response) {
          console.error("Server responded with error:", error.response.data);
        } else if (error.request) {
          console.error("No response from the server:", error.request);
        } else {
          console.error("Error during request setup:", error.message);
        }
      }
    };

    // Start polling
    pollOrderStatus(orderId);
  }


  async function AvtarGeneration() {
    const imageUrl = "https://www.shutterstock.com/shutterstock/photos/1554086789/display_1500/stock-photo-close-up-portrait-of-yong-woman-casual-portrait-in-positive-view-big-smile-beautiful-model-posing-1554086789.jpg"
    const textPrompt = "A person in a corporate attire in a plain white background, the person should have a similar body/face structure as the image uploaded";
    const styleImageUrl = "";
    
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      };
  
      const body = {
        imageUrl,
        styleImageUrl,
        textPrompt,
      };
  
      // Send the initial request to generate the avatar
      const response = await axios.post("http://localhost:5000/avtar", body, { headers });
      console.log("Response from avatar generation:", response.data);
  
      const avtarOrderId = response?.data?.body?.orderId;
  
      // Function to poll the order status
      const pollOrderStatus = async (avtarOrderId) => {
        try {
          // Send request to check the order status
          const response = await axios.post(
            "http://localhost:5000/avtar-status",
            { orderId: avtarOrderId },  // Only send the order ID in the body
            { headers }
          );
          console.log("Response in order status:", response.data);
  
          const status = response.data?.body?.status;
  
          if (status === "init") {
            console.log("Order is still initializing... waiting...");
            // Wait for 5 seconds before checking again
            setTimeout(() => pollOrderStatus(avtarOrderId), 5000);
          } else if (status === "active") {
            console.log("Order is active! Processing complete.");
            // Call finalAvatar only when the status is active
            finalAvatar(avtarOrderId);
          } else {
            console.log("Order status:", status);
            // Handle other possible statuses here if necessary
          }
        } catch (error) {
          console.error("Error fetching order status:", error);
          if (error.response) {
            console.error("Server responded with error:", error.response.data);
          } else if (error.request) {
            console.error("No response from the server:", error.request);
          } else {
            console.error("Error during request setup:", error.message);
          }
        }
      };
  
      // Start polling the order status
      pollOrderStatus(avtarOrderId);
  
    } catch (error) {
      console.error("Error during avatar generation:", error);
    }
  }
  
  // Function to get the final avatar result once the status is "active"
  async function finalAvatar(avtarOrderId) {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      };
  
      const body = {
        orderId: avtarOrderId,  // Send the order ID in the body
      };
  
      // Fetch the final avatar once the order is complete
      const response = await axios.post('http://localhost:5000/avtar-status', body, { headers });
      console.log("Final avatar result:", response.data);

      setFinalOutput(response.data?.body?.output)

      removeBackground(response.data?.body?.output)
  
      // Handle the final avatar response here (e.g., update the UI)
    } catch (error) {
      console.error("Error fetching final avatar:", error);
    }
  }
  

  return (
    <div className="flex items-center justify-center flex-col gap-6 p-[40px] ">
      <div>
        <img className="h-[500px] w-[500px]" src={imgUrl} alt="" />
      </div>

      <PrimaryButton onClick={AvtarGeneration}>capture</PrimaryButton>

      <div>
        <img src={removedImg} className="h-[500px] w-[500px]" alt="" />
      </div>
    </div>
  );
};
