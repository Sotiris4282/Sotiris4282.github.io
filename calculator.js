document.addEventListener("DOMContentLoaded", function () {
  const serviceTypeSelect = document.getElementById("serviceType");
  const squareMetersInput = document.getElementById("squareMeters");

  function updatePlaceholder() {
    const selectedValue = serviceTypeSelect.value;

    if (selectedValue === "pest_rodent") {
      squareMetersInput.placeholder = "Εισάγετε τα τ.μ. (μέγιστο 200)";
    } else if (selectedValue === "garden") {
      squareMetersInput.placeholder = "Εισάγετε τα τ.μ. (μέγιστο 50)";
    } else {
      squareMetersInput.placeholder = "Εισάγετε τα τ.μ. (μέγιστο 200)";
    }
  }

  updatePlaceholder();

  serviceTypeSelect.addEventListener("change", updatePlaceholder);

  const calculatorForm = document.getElementById("costCalculator");
  const resultContainer = document.getElementById("resultContainer");
  const resultDetails = document.getElementById("resultDetails");
  const costResult = document.getElementById("costResult");

  // Static pricing based on square meter ranges
  const fixedPricing = {
    pest_rodent: [
      { min: 0, max: 60, cost: 50 },
      { min: 60, max: 100, cost: 60 },
      { min: 100, max: 200, cost: 80 },
    ],
    garden: [{ min: 20, max: 50, cost: 70 }],
  };

  // Service names in Greek
  const serviceNames = {
    pest_rodent: "Απεντόμωση & Μυοκτονία",
    garden: "Συντήρηση Κήπου",
  };

  calculatorForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const serviceType = document.getElementById("serviceType").value;
    const squareMeters = parseFloat(
      document.getElementById("squareMeters").value,
    );

    if (!serviceType || isNaN(squareMeters) || squareMeters <= 0) {
      showError(
        "Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία με έγκυρες τιμές.",
      );
      return;
    }

    // Determine cost based on fixed pricing rules
    let cost = null;

    if (serviceType === "pest_rodent") {
      cost = fixedPricing.pest_rodent.find(
        (range) => squareMeters > range.min && squareMeters <= range.max,
      )?.cost;
    } else if (serviceType === "garden") {
      cost = fixedPricing.garden.find(
        (range) => squareMeters > range.min && squareMeters <= range.max,
      )?.cost;
    }

    if (cost === undefined || cost === null) {
      let customMessage =
        "Δεν υπάρχει διαθέσιμη τιμολόγηση για τα τετραγωνικά μέτρα που εισάγατε.";

      if (serviceType === "pest_rodent" && squareMeters > 200) {
        customMessage =
          "Για πάνω από 200 τ.μ. σε Απεντόμωση & Μυοκτονία, παρακαλούμε επικοινωνήστε μαζί μας για εξατομικευμένη προσφορά.";
      } else if (serviceType === "garden" && squareMeters > 50) {
        customMessage =
          "Για πάνω από 50 τ.μ. κήπου, παρακαλούμε επικοινωνήστε μαζί μας για ειδική εκτίμηση.";
      }

      showError(customMessage);
      return;
    }

    const formatter = new Intl.NumberFormat("el-GR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
    });

    resultDetails.innerHTML = `
      <p><span>Υπηρεσία:</span> <span>${serviceNames[serviceType]}</span></p>
      <p><span>Τετραγωνικά Μέτρα:</span> <span>${squareMeters} τ.μ.</span></p>
    `;

    costResult.textContent = `Συνολικό Κόστος: ${formatter.format(cost)}`;
    resultContainer.classList.add("active");
    resultContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  function showError(message) {
    let errorElement = document.querySelector(".calculator-error");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "calculator-error";
      calculatorForm.insertAdjacentElement("beforebegin", errorElement);
    }

    errorElement.textContent = message;
    errorElement.style.color = "#e53935";
    errorElement.style.padding = "10px 0";
    errorElement.style.fontWeight = "500";
    errorElement.style.display = "block";

    setTimeout(() => {
      errorElement.style.display = "none";
    }, 5000);
  }

  // Hide result when switching service
  document
    .getElementById("serviceType")
    .addEventListener("change", function () {
      resultContainer.classList.remove("active");
    });

  // Optional: animate info cards and menu logic (unchanged)
  const infoCards = document.querySelectorAll(".info-card");
  infoCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    setTimeout(
      () => {
        card.style.transition = "all 0.5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      },
      300 + index * 150,
    );
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }

  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("active", window.pageYOffset > 300);
    });
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
