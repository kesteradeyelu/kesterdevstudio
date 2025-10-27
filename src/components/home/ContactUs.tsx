"use client";
import { SectionWrapper } from "@/utils/hoc";
// import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { socials, tags } from "@/constants";
import { motion } from "motion/react";
import { AnimatedButton } from "../button";
import classNames from "classnames";
import { scaleVariants } from "@/utils/motion";
// import axios, { toFormData } from "axios";
// import toast, { Toaster } from "react-hot-toast";


const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  company: yup.string(),
  referral: yup.string(),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^$|^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, "Invalid phone number"),
  interests: yup
    .array()
    .of(yup.string())
    .min(1, "Select at least one interest"),
  message: yup.string().required("Message is required"),
});

export type FormData = yup.InferType<typeof schema>;

const ContactUs = () => {
  // const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      referral: "",
      email: "",
      phone: "",
      interests: [],
      message: "",
    },
  });

  const selectedInterests = watch("interests");

  const toggleInterest = (interest: string) => {
    const current = selectedInterests || [];

    if (current.includes(interest)) {
      // Remove interest if it's already selected
      setValue(
        "interests",
        current.filter((i) => i !== interest)
      );
    } else {
      // Add interest if it's not selected
      setValue("interests", [...current, interest]);
    }
  };

//   const onSubmit = (data: FormData) => {
//   const subject = encodeURIComponent("Message for you from Gmail");
//   const body = encodeURIComponent(
//     `Hello Kester Dev Studio,

// You have a new message from your website contact form:

// 👤 Name: ${data.name}
// 🏢 Company: ${data.company || "N/A"}
// 📧 Email: ${data.email}
// 📞 Phone: ${data.phone || "N/A"}
// 🎯 Interests: ${(data.interests || []).join(", ")}
// 💬 Message:
// ${data.message}

// Referral: ${data.referral || "N/A"}

// Best regards,
// ${data.name}`
//   );

//   // open user's default mail app
//   const mailtoLink = `mailto:info@kesterdevstudio.com?subject=${subject}&body=${body}`;
//   window.location.href = mailtoLink;
// };

const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert("✅ Your message has been sent successfully!");
      console.log("Saved contact:", result.data);

      // 🔹 Clear the form after success
      reset(); 
    } else {
      alert("❌ Failed to send your message. Please try again later.");
      console.error("Error response:", result);
    }
  } catch (error) {
    console.error("Request failed:", error);
    alert("⚠️ Unable to connect to the server. Check your network or try again later.");
  }
};



 

  return (
    <div
      id="contactUs"
      className="relative w-full h-full py-5 2xs:py-10 sm:py-20 overflow-hidden"
    >
      {/* <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #6C0BDB",
          },
          success: {
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      /> */}

      <div
        style={{
          position: "absolute",
          width: "285.38px",
          height: "285.38px",
          top: "-0.38px",
          left: "-124.88px",
          borderRadius: "50%",
          background: "#6C0BDB",
          opacity: 0.3,
          filter: "blur(107.09px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "220.63px",
          height: "220.63px",
          top: "371.13px",
          right: "-5%",
          borderRadius: "50%",
          background: "#6C0BDB",
          opacity: 0.5,
          filter: "blur(100.85px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          background: `linear-gradient(0deg, rgba(21, 21, 21, 0.25), rgba(21, 21, 21, 0.25)),
        linear-gradient(0deg, rgba(64, 64, 64, 0.2), rgba(64, 64, 64, 0.2))`,
        }}
        className="container w-full py-5 2xs:py-10 sm:py-20 px-4 sm:px-8 flex flex-col lg:flex-row gap-8 lg:gap-2"
      >
        <div className="w-full sm:w-[90%] lg:w-[40%] xl:w-[50%] flex flex-col justify-between gap-8 flex-1">
          <div className="w-full md:w-[80%] flex flex-col gap-3 xs:gap-5 lg:mt-16">
            <div className="flex items-center gap-1 text-[#6C0BDB]">
              <GoDotFill className="text-lg 2xs:text-xl" />{" "}
              <p className="text-sm 2xs:text-base">Connect with us!</p>
            </div>
            <motion.h1
              variants={scaleVariants}
              whileInView={scaleVariants.whileInView}
              className="text-3xl xs:text-4xl xl:text-5xl font-future text-white"
            >
              Turn Your Vision Into Reality
            </motion.h1>
            <div className="flex items-center gap-1 text-[#CACDCE]">
              <CiMail />
              <a
                href="mailto:info@kesterdevstudio.com"
                className="underline text-xs"
              >
                info@kesterdevstudio.com
              </a>{" "}
            </div>
          </div>
          <div className="max-lg:hidden flex items-center gap-2">
            {socials.map((social, index) => (
              <span
                onClick={() => {
                  window.open(social.url, "_blank");
                }}
                key={index}
                className="rounded-full p-2 border border-[#CACDCE] bg-transparent text-[#CACDCE] cursor-pointer hover:border-none hover:text-white hover:bg-primary text-base xl:text-lg"
              >
                <social.icon />
              </span>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-[60%] xl:w-[50%] h-full flex flex-col gap-16">
          <h2 className="text-white font-medium text-[2rem]">Contact Us</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex max-2xs:flex-col gap-5">
              <div className="w-full 2xs:w-1/2 flex flex-col">
                <input
                  type="text"
                  placeholder="Full name"
                  {...register("name")}
                  className="bg-transparent placeholder:text-[#8E8E93] placeholder:text-sm border-b border-[#8E8E93] text-white py-2.5 px-1 outline-none"
                  // disabled={isLoading}
                />
                {errors.name && (
                  <span className="text-xs text-red-500">
                    {errors.name.message as string}
                  </span>
                )}
              </div>
              <div className="w-full 2xs:w-1/2 flex flex-col">
                <input
                  type="text"
                  placeholder="Company"
                  {...register("company")}
                  className="bg-transparent placeholder:text-[#8E8E93] placeholder:text-sm border-b border-[#8E8E93] text-white py-2.5 px-1 outline-none"
                  // disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex max-2xs:flex-col gap-5">
              <div className="w-full 2xs:w-1/2 flex flex-col">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="bg-transparent placeholder:text-[#8E8E93] placeholder:text-sm border-b border-[#8E8E93] text-white py-2.5 px-1 outline-none"
                  // disabled={isLoading}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">
                    {errors.email.message as string}
                  </span>
                )}
              </div>
              <div className="w-full 2xs:w-1/2 flex flex-col">
                <input
                  type="text"
                  placeholder="phone"
                  {...register("phone")}
                  className="bg-transparent placeholder:text-[#8E8E93] placeholder:text-sm border-b border-[#8E8E93] text-white py-2.5 px-1 outline-none"
                  // disabled={isLoading}
                />
                {errors.phone && (
                  <span className="text-xs text-red-500">
                    {errors.phone.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col">
              <input
                type="text"
                placeholder="referral"
                {...register("referral")}
                className="bg-transparent placeholder:text-[#8E8E93] placeholder:text-sm border-b border-[#8E8E93] text-white py-2.5 px-1 outline-none"
                // disabled={isLoading}
              />
              {errors.referral && (
                <span className="text-xs text-red-500">
                  {errors.referral.message as string}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#8E8E93]">
                I&apos;m Interested on
              </label>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <motion.div
                    key={index}
                    onClick={() => toggleInterest(tag)}
                    className={classNames(
                      "uppercase cursor-pointer flex text-center px-3 2xl:px-3.5 py-2.5 2xl:py-3 text-white text-[10px] xl:text-xs",
                      {
                        "bg-primary": selectedInterests?.includes(tag),
                        "bg-white/9 border border-white/8  corner-border hover:bg-primary":
                          !selectedInterests?.includes(tag),
                        // "opacity-50 cursor-not-allowed": isLoading,
                      }
                    )}
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
              {errors.interests && (
                <span className="text-xs text-red-500">
                  {errors.interests.message as string}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Tell us more about your project!"
                className="bg-transparent placeholder:text-[#8E8E93] placeholder:text-sm border-b border-[#8E8E93] text-white py-2.5 px-1 outline-none resize-none"
                // disabled={isLoading}
              />
              <br/>
              <label className="text-sm text-[#8E8E93]">
               Or Reachout directly via info@kesterdevstudio.com
              </label>
              {errors.message && (
                <span className="text-xs text-red-500">
                  {errors.message.message as string}
                </span>
              )}
            </div>

            <AnimatedButton
              clipSize={14}
              className="w-full mt-8"
              // disabled={isLoading}
            >
              
               SEND
            </AnimatedButton>

            <div className="lg:hidden flex items-center justify-center gap-2">
              {socials.map((social, index) => (
                <span
                  onClick={() => {
                    window.open(social.url, "_blank");
                  }}
                  key={index}
                  className="rounded-full p-2 border border-[#CACDCE] bg-transparent text-[#CACDCE] cursor-pointer hover:border-none hover:text-white hover:bg-primary text-base xl:text-lg"
                >
                  <social.icon />
                </span>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(ContactUs, "contact-us");
