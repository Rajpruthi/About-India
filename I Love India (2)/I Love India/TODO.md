# TODO - Tourism Page

## Step 1: Repo understanding
- [x] Verify existing routing structure in `src/App.jsx`
- [x] Verify whether any tourism page/link already exists (none found)
- [x] Inspect `HomePage.jsx` tourism card navigation target (currently `/states`) 
- [x] Inspect `Layout.jsx` and `Navbar.jsx` to check for tourism links (none in primary menu)

## Step 2: Implement routing + page
- [ ] Create `src/pages/TourismPage/TourismPage.jsx`
- [ ] Create `src/pages/TourismPage/tourismPage.module.css`
- [ ] Add route `/tourism` in `src/App.jsx`

## Step 3: Fix Home navigation
- [ ] Update `src/pages/HomePage/HomePage.jsx` so Tourism card navigates to `/tourism`

## Step 4: Ensure “Tourism only on Tourism page”
- [ ] Confirm no tourism content is injected into other pages/components

## Step 5: Quality checks
- [ ] Run dev server and manually verify responsiveness, search/filter, galleries, lightbox

