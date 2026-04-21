const projects = [
  {
    title: "Creative Kids Hub",
    category: "family",
    categoryLabel: "Family Projects",
    description:
      "Interactive learning and art projects built collaboratively with my daughter, featuring games, stories, and creative tools.",
    tags: ["React", "Creative", "Educational"],
    url: "#"
  },
  {
    title: "Budget Tracker Pro",
    category: "finance",
    categoryLabel: "Personal Finance",
    description:
      "A comprehensive personal finance application with expense tracking, budget planning, and financial insights.",
    tags: ["Finance", "Analytics", "Dashboard"],
    url: "#"
  },
  {
    title: "Investment Portfolio Dashboard",
    category: "finance",
    categoryLabel: "Personal Finance",
    description:
      "Real-time portfolio tracking with performance metrics, asset allocation visualization, and market trends.",
    tags: ["Finance", "Charts", "Real-time"],
    url: "#"
  },
  {
    title: "Story Time Adventure",
    category: "family",
    categoryLabel: "Family Projects",
    description:
      "An interactive storytelling platform we built together, where kids can create and share their own illustrated stories.",
    tags: ["Interactive", "Storytelling", "Creative"],
    url: "#"
  },
  {
    title: "Expense Splitter",
    category: "finance",
    categoryLabel: "Personal Finance",
    description:
      "Smart tool for splitting expenses among groups, tracking shared costs, and settling payments efficiently.",
    tags: ["Finance", "Utilities", "Collaborative"],
    url: "#"
  }
];

const grid = document.getElementById("projectGrid");
const template = document.getElementById("projectTemplate");
const filterButtons = document.querySelectorAll(".filter-button");

function renderProjects(activeFilter = "all") {
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  grid.replaceChildren();

  filtered.forEach((project) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".project-card");

    card.classList.add(project.category);
    card.href = project.url;
    card.setAttribute("aria-label", `Open ${project.title} in a new tab`);

    fragment.querySelector(".project-category").textContent = project.categoryLabel;
    fragment.querySelector(".project-title").textContent = project.title;
    fragment.querySelector(".project-description").textContent = project.description;

    const tagList = fragment.querySelector(".tag-list");
    project.tags.forEach((tag) => {
      const listItem = document.createElement("li");
      listItem.textContent = tag;
      tagList.appendChild(listItem);
    });

    grid.appendChild(fragment);
  });
}

function setActiveFilter(nextFilter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === nextFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  grid.classList.add("hidden");
  requestAnimationFrame(() => {
    renderProjects(nextFilter);
    grid.classList.remove("hidden");
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

renderProjects();
