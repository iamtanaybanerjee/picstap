const {
  searchPhotos,
  savePhoto,
  addTagsToPhoto,
  searchPhotoByTag,
} = require("../controllers/photoControllers");

const { photo: photoModel, tag: tagModel } = require("../models");

jest.mock("../models", () => ({
  //   create: jest.fn(),
  photo: {
    create: jest.fn(),
  },
  tag: {
    create: jest.fn(),
  },
}));

describe("Photo controller tests", () => {
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
});
