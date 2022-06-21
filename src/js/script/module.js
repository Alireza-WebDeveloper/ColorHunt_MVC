'use strict';
import { async } from 'regenerator-runtime';
import { Ajax, timeOut, timeRun, CreateRandomArray } from './helpers';
import { API_URL, SEC, Res_Per_Page } from './config';
/// State
const state = {
  singlePalette: {},
  singlePaletteComments: [],
  allPalettes: {
    result: [],
    query: '',
  },
  likesList: [],
  bookMarkList: [],
  allCategories: {
    names: [],
    query: '',
    page: 1,
    resultPerPage: Res_Per_Page,
    size: 0,
  },
  createCategoryPalette: [],
};
//// Check(Update True BookmarkList On All Palette Render )
const checkUpdate_Bookmark_LikeList = () => {
  state.allPalettes.result.forEach((ObjectRes) => {
    state.bookMarkList.forEach((ObjectBookMark) => {
      if (ObjectRes.id === ObjectBookMark.id) {
        ObjectRes.bookmarked = true;
      }
    });
  });
  state.allPalettes.result.forEach((ObjectRes) => {
    state.likesList.forEach((id) => {
      if (ObjectRes.id === id) {
        ObjectRes.activeLike = true;
      }
    });
  });
};
/**
 *
 * @param {*} id = 36255#6944#11
 * @description loading single Palette
 * @returns Object Of SinglePalette
 */
const loadingGetSinglePalett = async function (id) {
  try {
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(`${API_URL}palettes/${id}`),
    ]);
    if (!data) return;
    state.singlePalette = data;
    //// Add Bookmarked when loading page , load singlePlaette
    state.bookMarkList.some((Object) => Object.id === state.singlePalette.id)
      ? (state.singlePalette.bookmarked = true)
      : '';
    state.likesList.some((id) => id === state.singlePalette.id)
      ? (state.singlePalette.activeLike = true)
      : '';
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {*} query = all
 * @description Become Arrays to => Palette Similar : Equal(CategoryId)
 * @returns Array Of Equal(CategoryId Palette == Single Palette)
 */
const loadingGetSinglePalettSimilarCategory = async function (query) {
  const data = await Promise.race([
    timeOut(SEC),
    Ajax(`${API_URL}palettes/${query}`),
  ]);
  if (!data) return;
  const similarCategorys = data.filter(
    ({ categoryId }) => categoryId === state.singlePalette.categoryId
  );
  state.allPalettes.result = CreateRandomArray(
    similarCategorys,
    similarCategorys.length
  ).slice(0, 10);
  state.allPalettes.query = '';
  checkUpdate_Bookmark_LikeList();
};

/**
 *
 * @param {*} id single Palette Ex : 63669#54152
 * @returns Array of Comment List Single Palette
 */
const loadingGetSinglePalettComments = async function (id) {
  const data = await Promise.race([
    timeOut(SEC),
    Ajax(`${API_URL}comments/${id}`),
  ]);
  if (!data) return;
  state.singlePaletteComments = data;
};

/**
 *
 * @param {*} ObjectData From Single palette
 * @description send form comment
 * @returns Comments List of Single Palette
 */
const loadingSendSinglePaletteComment = async function (ObjectData) {
  try {
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(
        `${API_URL}comments/${state.singlePalette.id}?author=${ObjectData.author}&title=${ObjectData.title}&message=${ObjectData.message}`,
        'POST'
      ),
    ]);
    if (!data) return;
    state.singlePaletteComments.unshift(data);
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} query  = all
 * @returns  All Palette Similar []
 */
const loadingGetAllPaletteSimilar = async function (query) {
  try {
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(`${API_URL}palettes/${query}`),
    ]);
    if (!data) return;

    state.allPalettes.result = data;
    state.allPalettes.query = query;
    //// زمانی که صفحه لود شد ، باید هر پالت چک کنیم که اگر ایدی اون در لیست بوک مارک وجود داشت
    /// مقدار صحیح به خودش بگیرد
    checkUpdate_Bookmark_LikeList();
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {*} categoryName Ex : pastel,neon,...
 * @param {*} page Ex : 1
 * @returns  list array(pallette of category Name)
 */
const loadingGetAllPaletteCategoryByName_Page = async function (
  categoryName = state.allCategories.query,
  page = state.allCategories.page
) {
  try {
    state.allCategories.page = page;
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(
        `${API_URL}palettes/all/${categoryName}?pageSize=${state.allCategories.resultPerPage}&pageNumber=${page}`
      ),
    ]);
    if (!data) return;
    state.allCategories.query = categoryName;
    state.allPalettes.result = data;
    //// زمانی که صفحه لود شد ، باید هر پالت چک کنیم که اگر ایدی اون در لیست بوک مارک وجود داشت
    /// مقدار صحیح به خودش بگیرد
    checkUpdate_Bookmark_LikeList();
    /// اضافه شدن پالت ساخته شده
    if (
      state.allCategories.size % state.allCategories.resultPerPage !== 0 &&
      Math.floor(
        state.allCategories.size / state.allCategories.resultPerPage
      ) === state.allCategories.page
    ) {
      state.allPalettes.result.push(...state.createCategoryPalette);
    }
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {*} query  string = 'all'
 * @param {*} tab  = list of tab Ex : ['random','new','popular']
 * @returns
 */
const loadingGetAllPaletteSidebar = async function (query, tab) {
  try {
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(`${API_URL}palettes/${query}`),
    ]);
    if (!data) return;
    // popular
    if (String(tab).startsWith('popular')) {
      state.allPalettes.result = data
        .filter(({ likes }) => likes > 0)
        .sort(({ likes: a }, { likes: b }) => b - a);
      state.allPalettes.query = tab;
      //// زمانی که صفحه لود شد ، باید هر پالت چک کنیم که اگر ایدی اون در لیست بوک مارک وجود داشت
      /// مقدار صحیح به خودش بگیرد
      checkUpdate_Bookmark_LikeList();
    }
    // new
    if (String(tab).startsWith('new')) {
      state.allPalettes.result = data;
      state.allPalettes.query = tab;
      //// زمانی که صفحه لود شد ، باید هر پالت چک کنیم که اگر ایدی اون در لیست بوک مارک وجود داشت
      /// مقدار صحیح به خودش بگیرد
      checkUpdate_Bookmark_LikeList();
    }
    //random
    if (String(tab).startsWith('random')) {
      state.allPalettes.result = CreateRandomArray(data, data.length);
      state.allPalettes.query = tab;
      //// زمانی که صفحه لود شد ، باید هر پالت چک کنیم که اگر ایدی اون در لیست بوک مارک وجود داشت
      /// مقدار صحیح به خودش بگیرد
      checkUpdate_Bookmark_LikeList();
    }
  } catch (error) {
    throw error;
  }
};

/*
LikeList
*/
/**
 *
 * @param {*} data  =  Object From Palette = {color1,color2,categoryId,likes,...}
 * @param {*} condition if True -> DisLike Ex : 3=>2 , if False => Like Ex : 2 => 3
 */
const UiLikesList = (data, condition) => {
  // Update Object -> All Palette()
  const updateObj_AllPalette = state.allPalettes.result.findIndex(
    ({ id }) => id === data.id
  );
  if (updateObj_AllPalette !== -1) {
    state.allPalettes.result[updateObj_AllPalette].likes = data.likes;
    state.allPalettes.result[updateObj_AllPalette].activeLike = condition;
  }
  // Update Object -> CreateAllCategory Palette()
  const updateObj_CreateCategoryPalette = state.createCategoryPalette.findIndex(
    ({ id }) => id === data.id
  );
  if (updateObj_CreateCategoryPalette !== -1) {
    state.createCategoryPalette[updateObj_CreateCategoryPalette].likes =
      data.likes;
    state.createCategoryPalette[updateObj_CreateCategoryPalette].activeLike =
      condition;
  }
  // Update Object -> BookMarkList
  const updateObj_BookMarkList = state.bookMarkList.findIndex(
    ({ id }) => id === data.id
  );
  if (updateObj_BookMarkList !== -1) {
    state.bookMarkList[updateObj_BookMarkList].likes = data.likes;
    state.bookMarkList[updateObj_BookMarkList].activeLike = condition;
  }
  // updateObj_SinglePalette
  if (state.singlePalette.id === data.id) {
    state.singlePalette.likes = data.likes;
    state.singlePalette.activeLike = condition;
  }
  /// update LocalStorage Like-> LikeList  , BookMarkList , CreatePaletteCategory
  updateLocalStorageLikesList();
  updateLocalStorageBookMarkList();
  updateLocalStorageCreatePaletteCategory();
};
/**
 *
 * @param {*} id Palette  Ex = 2636#54855#9693
 * @description addLike Palette , Ex: 3=> 4 , 4 => 5
 */
const loadingAddLikePalette = async function (id) {
  try {
    if (state.likesList.includes(id)) return loadingDisLikePalette(id);
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(`${API_URL}palettes/like/${id}`, 'PUT'),
    ]);
    if (!data) return;
    /// Add id  To Like List []
    state.likesList.push(data.id);
    state.likesList = [...new Set(state.likesList)];
    UiLikesList(data, true);
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {*} id  Ex : 5636#96954#7452
 * @description DisLike Palette Ex : 2 => 1 , 4 => 3
 *
 */
const loadingDisLikePalette = async function (id) {
  try {
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(`${API_URL}palettes/dislike/${id}`, 'PUT'),
    ]);
    if (!data) return;
    // Delete From likesList
    const index = state.likesList.findIndex((id) => id === data.id);
    state.likesList.splice(index, 1);
    UiLikesList(data, false);
  } catch (error) {
    throw error;
  }
};
/// save-> local Storage like List
const updateLocalStorageLikesList = function () {
  localStorage.setItem('likesList', JSON.stringify(state.likesList));
};
/// load-> local Storage Like List
const loadingLocalStorageLikesList = function () {
  const data = localStorage.getItem('likesList');
  if (!data) return;
  state.likesList = JSON.parse(data);
};

/* 
 BookMark
*/
/**
 *
 * @param {*} id Ex : '#263963322588' of Palette
 * @param {*} condition AddBookMark -> True , DeleteBookMark->False
 * @returns Object Target
 */
const UiBookMark = (id, condition) => {
  /// Update AllPalette()
  const updateObj_AllPalette = state.allPalettes.result.find(
    (ObjectData) => ObjectData.id === id
  );
  updateObj_AllPalette ? (updateObj_AllPalette.bookmarked = condition) : '';
  /// Update createCategoryPalette
  const updateObj_CategoryPalette = state.createCategoryPalette.find(
    (ObjectData) => ObjectData.id === id
  );
  updateObj_CategoryPalette
    ? (updateObj_CategoryPalette.bookmarked = condition)
    : '';
  /// Update on Single Palette
  state.singlePalette.id === id
    ? (state.singlePalette.bookmarked = condition)
    : '';
  /// Return Object Find
  return (
    updateObj_AllPalette || updateObj_CategoryPalette || state.singlePalette
  );
};
/**
 *
 * @param {*} id Ex : 6363#5475#12525#63
 * @description Add Palette to BookmarkList
 * @returns array of save list Bookmark
 */
const addBookMarkList = function (id) {
  const include = state.bookMarkList.some((ObjectData) => ObjectData.id === id);
  if (include) return deleteBookMarkList(id);
  /// Update BookMarkList
  let ObjPush = UiBookMark(id, true);
  state.bookMarkList.push(ObjPush);
  updateLocalStorageBookMarkList();
};
/**
 *
 * @param {*} id Ex : 6363#5475#12525#63
 * @description Delete Palette to BookmarkList
 * @returns array of save list Bookmark
 */
const deleteBookMarkList = function (id) {
  const index = state.bookMarkList.findIndex(
    (ObjectData) => ObjectData.id === id
  );
  state.bookMarkList.splice(index, 1);
  UiBookMark(id, false);
  /// Update LocalStorage BookMarkList
  updateLocalStorageBookMarkList();
};
/// save --> localstorage Bookmark
const updateLocalStorageBookMarkList = function () {
  localStorage.setItem('bookmarklist', JSON.stringify(state.bookMarkList));
};
/// load -> localstorage Bookmark
const loadingLocalStorageBookMarkList = function () {
  const data = localStorage.getItem('bookmarklist');
  if (!data) return;
  state.bookMarkList = JSON.parse(data);
};
/**
 *
 * @param {*} query = all
 * @description get list names category from request server Ajax()
 * @returns ['neon','pastel','neon',.....]
 */
const loadingGetAllCategoryNames = async function (query) {
  try {
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(`${API_URL}category/${query}`),
    ]);
    if (!data) return;
    state.allCategories.names = data;
  } catch (error) {
    throw error;
  }
};

/* Category Size Pagination */
/**
 *
 * @param {*} query Ex : ['pastel','neon',...]
 * @returns length of category name => Ex : pastel , 28 palette length
 */
const loadingGetSizeCategoryNames = async function (query) {
  try {
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(`${API_URL}category/size/${query}`),
    ]);
    if (!data) return;
    state.allCategories.size = +data;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {*} cateGoryName = EX:['pastel','neon',...]
 * @param {*} uploadData Object = {categoryName,color1,color2,color3,color4};
 * @returns Object From Server => new Palette Create Ex : like to single Palette
 */
const loadingCreatePaletteCategory = async function (cateGoryName, uploadData) {
  try {
    const data = await Promise.race([
      timeOut(SEC),
      Ajax(`${API_URL}palettes/create/${cateGoryName}`, 'POST', uploadData),
    ]);
    if (!data) return;
    state.createCategoryPalette.push(data);
    state.singlePalette = data;
    updateLocalStorageCreatePaletteCategory();
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param {*} id = palette Id Create=> Delete Ex : 68544#213#4626#82
 * @description  Delete paletteCreate,Update (Category,BookMark,LikeList,AllPalette)
 *
 */
const UiDeletepaletteCategory = (id) => {
  ///Update Category List
  const indexOfCategoryList = state.createCategoryPalette.findIndex(
    (ObjectData) => ObjectData.id === id
  );
  state.createCategoryPalette.splice(indexOfCategoryList, 1);
  /// Update BookMark List
  const indexOfBookMarkList = state.bookMarkList.findIndex(
    (ObjectData) => ObjectData.id === id
  );
  if (indexOfBookMarkList !== -1) {
    state.bookMarkList.splice(indexOfBookMarkList, 1);
  }
  /// Update Like List
  const indexOfLikeList = state.likesList.findIndex((getId) => getId === id);
  if (!indexOfLikeList !== -1) {
    state.likesList.splice(indexOfLikeList, 1);
  }
};
/**
 *
 * @param {*} id = palette Id Create=> Delete Ex : 68544#213#4626#82
 */
const deleteCreatePaletteCategory = async function (id) {
  try {
    await Ajax(`${API_URL}palettes/${id}`, 'DELETE');
    UiDeletepaletteCategory(id);
    updateLocalStorageCreatePaletteCategory();
    updateLocalStorageBookMarkList();
    updateLocalStorageLikesList();
  } catch (error) {
    console.log(error);
  }
};
/// save CreatePalette --> LocalStorage
const updateLocalStorageCreatePaletteCategory = function () {
  localStorage.setItem(
    'createPaletteCategory',
    JSON.stringify(state.createCategoryPalette)
  );
};
/// Delete CreatePalette -> LocalStorage
const loadingLocalStorageCreatePaletteCategory = function () {
  const data = localStorage.getItem('createPaletteCategory');
  if (!data) return;
  state.createCategoryPalette = JSON.parse(data);
};

/// Exports Functions
export {
  loadingGetSinglePalett,
  loadingGetSinglePalettSimilarCategory,
  loadingGetSinglePalettComments,
  loadingSendSinglePaletteComment,
  state,
  loadingGetAllPaletteSimilar,
  loadingGetAllPaletteSidebar,
  getAllPalettePage,
  loadingAddLikePalette,
  loadingLocalStorageLikesList,
  addBookMarkList,
  loadingGetAllCategoryNames,
  loadingGetSizeCategoryNames,
  loadingCreatePaletteCategory,
  loadingLocalStorageBookMarkList,
  loadingLocalStorageCreatePaletteCategory,
  deleteCreatePaletteCategory,
  loadingGetAllPaletteCategoryByName_Page,
};
