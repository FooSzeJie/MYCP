import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockLocalAuthority as initialData } from "../../../data/mockData"; // Import mock data

const initialValues = {
  name: "",
  email: "",
  phone: "",
  area: "",
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  area: yup.string().required("required"),
});

const AddLocalAuthority = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();

  const [mockLocalAuthority, setMockLocalAuthority] = useState(initialData);

  const handleFormSubmit = (values) => {
    // Generate a new id for the new entry
    const newId = mockLocalAuthority.length
      ? mockLocalAuthority[mockLocalAuthority.length - 1].id + 1
      : 1;

    // Create the new entry
    const newEntry = {
      id: newId,
      ...values,
    };

    // Add the new entry to the mock data
    setMockLocalAuthority((prevData) => {
      const updatedData = [...prevData, newEntry];
      console.log("Updated mock data:", updatedData); // Log the updated data
      return updatedData;
    });

    // Navigate back to the authority page
    navigate("/local_authority"); // Adjust route as needed
  };

  return (
    <Box m="20px">
      <Header
        title={"Create Local Authority"}
        subtitle={"Create a New Local Authority"}
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display={"grid"}
              gap="30px"
              gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Area"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.area}
                name="area"
                error={!!touched.area && !!errors.area}
                helperText={touched.area && errors.area}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            <Box display={"flex"} justifyContent={"end"} mt={"20px"}>
              <Button type="submit" color="secondary" variant="contained">
                Create New Local Authority
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddLocalAuthority;
