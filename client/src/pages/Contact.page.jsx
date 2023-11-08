import { BsInfoLg } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiPhone } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import { BreadCrumb, Input, Meta } from "../components";
import { Button } from "../components/ui/Button";
import { ImgText } from "../components/ui/ImgText";

const Contact = () => {
  return (
    <>
      <Meta title="Contact" />

      <div className="w-full bg-[#f5f5f7]">
        <BreadCrumb text="Contact" />

        <div className="max-w-7xl mx-auto mt-8 pb-8 space-y-6">
          {/* Map */}
          <div className="rounded-md overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.01084595696!2d3.3635289999999998!3d6.529535450000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228fa2a3999%3A0xd7a8324bddbba1f0!2sIkeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1699336664155!5m2!1sen!2sng"
              width={600}
              height={400}
              loading="lazy"
              referrerPolicy="no-ref-policy-when-downgraded"
              allowFullScreen
              className="border-none w-full"
              title="Google Map"
            ></iframe>
          </div>

          {/* Form */}
          <div className="bg-white shadow-lg rounded-md px-6 py-8 flex gap-10">
            {/* Left */}
            <div className="flex-1 space-y-4">
              <h1 className="text-xl font-semibold">Contact</h1>
              <form action="" className="space-y-4">
                <Input type="text" name="name" placeholder="Name" />
                <Input type="email" name="email" placeholder="Email" />
                <Input type="text" name="phone" placeholder="Phone" />

                <textarea
                  name="comment"
                  id=""
                  rows="3"
                  placeholder="Comment"
                  className="w-full bg-gray-100 text-xs p-2 outline-none rounded-md"
                ></textarea>

                <Button text="Send" />
              </form>
            </div>
            {/* right */}
            <div className="flex-1 space-y-4">
              <h1 className="text-xl font-semibold">Get In Touch With Us</h1>

              <ImgText
                Icon={IoHome}
                text="2, Adefolu Dr., Ikeja, Lagos, Nigeria."
                gap
              />
              <ImgText Icon={HiPhone} text="+234 9054545434" gap />
              <ImgText Icon={GrMail} text="dstores@gmail.com" gap />
              <ImgText Icon={BsInfoLg} text="Monday to Friday" gap />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
