import {PhotosApi} from "../../api/api";

export const photos = {
    namespaced: true,

    state: {
        photo: {},
        photos: [],
        photosPagination: {
            current_page: 1,
            data: [],
            first_page_url: '',
            from: null,
            last_page: 1,
            last_page_url: '',
            links: [],
            next_page_url: null,
            path: '',
            per_page: 10,
            prev_page_url: null,
            to: null,
            total: 0,
        },
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
        async onAddPhotos({commit}, {formDataArray, album_id}) {
            await this.dispatch('loading/setLoading', true);

            const requests = [];

            formDataArray.forEach((formData, index) => {
                requests.push(PhotosApi.createPhoto(formData));
            });

            try {
                const responses = await Promise.all(requests);

                const allRequestsSuccessful = responses.every(response => response.status === 200);

                if (allRequestsSuccessful) {
                    await this.dispatch('photos/setPhotoModalShow', false);
                    await this.dispatch('photoAlbum/onGetPhotoAlbumPhotos', {id: album_id});
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
        async onCreatePhoto({commit}, {formData, album_id}) {
            PhotosApi
                .createPhoto(formData)
                .then(async (res) => {
                    await this.dispatch('photoAlbum/onGetPhotoAlbumPhotos', {id: album_id});
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
        async onGetPhoto({commit}, {id}) {
            await this.dispatch('loading/setLoading', true);
            PhotosApi
                .getPhoto(id)
                .then(async (res) => {
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
        async onUpdatePhoto({commit}, {album_id, id, name, date, persons, description}) {
            await this.dispatch('loading/setLoading', true);
            PhotosApi
                .updatePhoto(id, name, date, persons, description)
                .then(async (res) => {
                    await this.dispatch('photoAlbum/onGetPhotoAlbumPhotos', {id: album_id});
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
        async onDeletePhoto({commit}, {album_id, id}) {
            await this.dispatch('loading/setLoading', true);
            PhotosApi
                .deletePhoto(id)
                .then(async (res) => {
                    await this.dispatch('photos/setPhotoModalShow', false);
                    await this.dispatch('photoAlbum/onGetPhotoAlbumPhotos', {id: album_id});
                    await this.dispatch('reports/showSuccess', res);
                })
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
        async onUpdatePhotoPersons({commit}, {id, persons}) {
            await this.dispatch('loading/setLoading', true);
            PhotosApi
                .updatePhotoPersons(id, persons)
                .then(async (res) => {})
                .catch(async (err) => {
                    await this.dispatch('reports/showErrors', err);
                })
                .finally(async () => {
                    await this.dispatch('loading/setLoading', false);
                });
        },
    },
};