import {PhotosApi} from "../../api/api";

export const photos = {
    namespaced: true,

    state: {
        photo: {},
        photos: [],
        photoModalShow: false,
    },
    getters: {
        showStatus: state => state.photoModalShow,
    },
    mutations: {
        setPhotoData(state, photo) {
            state.photo = photo;
        },
        setPhotosData(state, photos) {
            state.photos = photos;
        },
        setPhotoModalShowData(state, photoModalShow) {
            state.photoModalShow = photoModalShow;
        },
        setPhotosPaginationData(state, photosPagination) {
            state.photosPagination = photosPagination;
        },
    },
    actions: {
        setPhoto({commit}, photo) {
            commit('photos/setPhotoData', photo, {root: true});
        },
        setPhotos({commit}, photos) {
            commit('photos/setPhotosData', photos, {root: true});
        },
        setPhotoModalShow({commit}, photoModalShow) {
            commit('photos/setPhotoModalShowData', photoModalShow, {root: true});
        },
        setPhotosPagination({commit}, photosPagination) {
            commit('photos/setPhotosPaginationData', photosPagination, {root: true});
        },
        async onGetPhotos({commit}, {car_id}) {
            await this.dispatch('loading/setLoading', true);
            PhotosApi
                .getCarPhotos(car_id)
                .then(async (res) => {
                    await this.dispatch('photos/setPhotos', res.data.data);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onCreatePhoto({commit}, {car_id, formData}) {
            PhotosApi
                .createPhoto(car_id, formData)
                .then(async (res) => {
                    await this.dispatch('photos/setPhotoModalShow', false);
                    await this.dispatch('photos/setPhoto', res.data.data);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onAddPhotos({commit}, {car_id, formDataArray}) {
            await this.dispatch('loading/setLoading', true);

            const requests = [];

            formDataArray.forEach((formData, index) => {
                requests.push(PhotosApi.createPhoto(car_id, formData));
            });

            try {
                const responses = await Promise.all(requests);

                const allRequestsSuccessful = responses.every(response => response.status === 200);

                if (allRequestsSuccessful) {
                    await this.dispatch('photos/setPhotoModalShow', false);
                    await this.dispatch('reports/showSuccess', {
                        data: {
                            data: {
                                message: "Фотографії успішно додані"
                            }
                        },
                        status: 201,
                    });
                } else {
                    console.error('One or more requests failed');
                }
            } catch (error) {
                console.error('An error occurred while making requests:', error);
            }
        },
        async onDeletePhoto({commit}, {car_id, photo_id}) {
            await this.dispatch('loading/setLoading', true);
            PhotosApi
                .deletePhoto(car_id, photo_id)
                .then(async (res) => {
                    await this.dispatch('photos/setPhotoModalShow', false);
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
    },
};