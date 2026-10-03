(function () {
  "use strict";

  var input = document.getElementById("search");
  var clearBtn = document.getElementById("searchClear");
  var noResults = document.getElementById("noResults");
  var tagChips = Array.prototype.slice.call(document.querySelectorAll(".tag-chip"));
  var days = Array.prototype.slice.call(document.querySelectorAll(".entry"));

  if (!input || days.length === 0) {
    return;
  }

  function applyFilter() {
    var query = input.value.trim().toLowerCase();
    var visibleCount = 0;

    days.forEach(function (day) {
      var text = day.textContent.toLowerCase();
      var matches = query === "" || text.indexOf(query) !== -1;

      day.hidden = !matches;
      day.classList.toggle("is-match", matches && query !== "");

      if (matches) {
        visibleCount += 1;
      }
    });

    if (clearBtn) {
      clearBtn.hidden = query === "";
    }

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }

    tagChips.forEach(function (chip) {
      chip.classList.toggle("is-active", chip.dataset.tag.toLowerCase() === query);
    });
  }

  input.addEventListener("input", applyFilter);

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      input.value = "";
      applyFilter();
      input.focus();
    });
  }

  tagChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var tag = chip.dataset.tag;
      input.value = input.value.trim() === tag ? "" : tag;
      applyFilter();
    });
  });
})();
