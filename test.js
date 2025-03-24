document.addEventListener("DOMContentLoaded", function () {
  console.log("🔍 Script Loaded: Checking profiles...");

  const profiles = document.querySelectorAll(".notion-collection-card");
  console.log(`👤 Found ${profiles.length} profiles`);

  const genderDropdown = document.getElementById("filter-gender");
  const countryDropdown = document.getElementById("filter-country");
  const ageDropdown = document.getElementById("filter-age");
  const occupationDropdown = document.getElementById("filter-occupation");

  const data = {
    gender: new Set(),
    country: new Set(),
    age: new Set(),
    occupation: new Set()
  };

  // Collect unique values from profiles
  profiles.forEach((profile, index) => {
    const profileGender = profile.querySelector(".property-59425442")?.textContent.trim();
    const profileCountry = profile.querySelector(".property-5a5c7773")?.textContent.trim();
    const profileAge = profile.querySelector(".property-637d5e46")?.textContent.trim();
    const profileOccupation = profile.querySelector(".property-5b777847")?.textContent.trim();

    console.log(`📌 Profile ${index + 1}:`);
    console.log("   - Gender:", profileGender);
    console.log("   - Country:", profileCountry);
    console.log("   - Age Group:", profileAge);
    console.log("   - Occupation:", profileOccupation);

    if (profileGender) data.gender.add(profileGender);
    if (profileCountry) data.country.add(profileCountry);
    if (profileAge) data.age.add(profileAge);
    if (profileOccupation) data.occupation.add(profileOccupation);
  });

  console.log("📊 Unique Values Extracted:");
  console.log("   - Gender:", [...data.gender]);
  console.log("   - Country:", [...data.country]);
  console.log("   - Age Group:", [...data.age]);
  console.log("   - Occupation:", [...data.occupation]);

  // Function to populate dropdowns
  function populateDropdown(dropdown, values) {
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      dropdown.appendChild(option);
    });
  }

  // Populate filters dynamically
  populateDropdown(genderDropdown, data.gender);
  populateDropdown(countryDropdown, data.country);
  populateDropdown(ageDropdown, data.age);
  populateDropdown(occupationDropdown, data.occupation);

  console.log("✅ Dropdowns should now be populated!");
});
