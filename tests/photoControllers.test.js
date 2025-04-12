const {
  searchPhotos,
  savePhoto,
  addTagsToPhoto,
  searchPhotoByTag,
} = require("../controllers/photoControllers");
const axiosInstance = require("../lib/axios.lib");

const { photo: photoModel, tag: tagModel } = require("../models");

jest.mock("../models", () => ({
  //   create: jest.fn(),
  photo: {
    create: jest.fn(),
    findOne: jest.fn(),
  },
  tag: {
    create: jest.fn(),
  },
}));

jest.mock("../lib/axios.lib", () => ({
  get: jest.fn(),
}));

jest.mock("../services/photoServices", () => ({
  updatePhoto: jest.fn(),
  createTag: jest.fn(),
}));

const { updatePhoto, createTag } = require("../services/photoServices");

describe("Photo controller tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should save photo", async () => {
    const mockResponse = {
      message: "Photo saved successfully",
      newPhoto: {
        id: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1529419412599-7bb870e11810?ixid=M3w3MzUyOTJ8MHwxfHNlYXJjaHwzfHxuYXR1cmV8ZW58MHx8fHwxNzQ0NDM2MTg3fDA&ixlib=rb-4.0.3",
        description: "mountain",
        altDescription: "mountain",
        tags: ["nature"],
        userId: 1,
      },
    };

    photoModel.create.mockResolvedValue({
      id: 1,
      imageUrl:
        "https://images.unsplash.com/photo-1529419412599-7bb870e11810?ixid=M3w3MzUyOTJ8MHwxfHNlYXJjaHwzfHxuYXR1cmV8ZW58MHx8fHwxNzQ0NDM2MTg3fDA&ixlib=rb-4.0.3",
      description: "mountain",
      altDescription: "mountain",
      tags: ["nature"],
      userId: 1,
    });

    tagModel.create.mockResolvedValue({
      id: 1,
      name: "nature",
      photoId: 1,
    });

    const req = {
      body: {
        imageUrl:
          "https://images.unsplash.com/photo-1529419412599-7bb870e11810?ixid=M3w3MzUyOTJ8MHwxfHNlYXJjaHwzfHxuYXR1cmV8ZW58MHx8fHwxNzQ0NDM2MTg3fDA&ixlib=rb-4.0.3",
        description: "mountain",
        altDescription: "mountain",
        tags: ["nature"],
        userId: 1,
      },
    };

    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await savePhoto(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResponse);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("should search photos", async () => {
    const mockResponse = {
      message: "No images found for the given query.",
    };

    const mockData = {
      data: {
        total: 0,
        total_pages: 0,
        results: [],
      },
    };
    axiosInstance.get.mockResolvedValue(mockData);

    const req = { query: { query: "olord" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await searchPhotos(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/search/photos?query=olord`
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test("should add tags to a photo", async () => {
    const mockResponse = {
      message: "Tags added successfully",
      photo: {
        id: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1585974738771-84483dd9f89f?ixid=M3w3MzUyOTJ8MHwxfHNlYXJjaHwyfHx6b29tfGVufDB8fHx8MTc0NDI5MTk0M3ww&ixlib=rb-4.0.3",
        description: "zoom",
        altDescription: "zoom",
        tags: ["zoom", "laptop", "tech"],
        userId: 1,
      },
    };

    photoModel.findOne.mockResolvedValue({
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1585974738771-84483dd9f89f?ixid=M3w3MzUyOTJ8MHwxfHNlYXJjaHwyfHx6b29tfGVufDB8fHx8MTc0NDI5MTk0M3ww&ixlib=rb-4.0.3",
      description: "zoom",
      altDescription: "zoom",
      tags: ["zoom", "laptop"],
      userId: 1,
    });

    updatePhoto.mockResolvedValue({
      id: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1585974738771-84483dd9f89f?ixid=M3w3MzUyOTJ8MHwxfHNlYXJjaHwyfHx6b29tfGVufDB8fHx8MTc0NDI5MTk0M3ww&ixlib=rb-4.0.3",
      description: "zoom",
      altDescription: "zoom",
      tags: ["zoom", "laptop", "tech"],
      userId: 1,
    });

    createTag.mockResolvedValue();

    const req = { params: { photoId: 4 }, body: { tags: ["tech"] } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    await addTagsToPhoto(req, res);

    expect(res.json).toHaveBeenCalledWith(mockResponse);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
