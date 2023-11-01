const { NotFoundError } = require("../errors");
const Enquiry = require("../model/enq.schema");
const { StatusCodes } = require("http-status-codes");

const EnquiryCtrl = {
  createEnquiry: async (req, res) => {
    const enquiry = await Enquiry.create({ ...req.body });
    res.status(StatusCodes.CREATED).json(enquiry);
  },
  getEnquiries: async (req, res) => {
    const enquiry = await Enquiry.find({});
    res.status(StatusCodes.OK).json(enquiry);
  },
  getEnquiry: async (req, res) => {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      throw new NotFoundError("Enquiry not found");
    }

    res.status(StatusCodes.OK).json(enquiry);
  },
  updateEnquiry: async (req, res) => {
    const { id } = req.params;
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!enquiry) {
      throw new NotFoundError("Enquiry not found");
    }

    res.status(StatusCodes.OK).json(enquiry);
  },
  deleteEnquiry: async (req, res) => {
    const { id } = req.params;
    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      throw new NotFoundError("Enquiry not found");
    }

    res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
  },
};

module.exports = EnquiryCtrl;
