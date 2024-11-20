<template>
  <div class="col-md-12 white_card" v-if="user?.invitations?.length">
    <div class="invitation-card">
      <h5 class="p-t-15 p-b-15 text-center col-md-12">{{ $t('ui.invitation.active_invitations') }}</h5>

      <!-- Loop through invitations if there are any -->
      <div v-if="user.invitations?.length !== 0" v-for="invitation in user.invitations" class="col-md-12">
        <div class="box box-shadow-hover">
          <div class="details">
            <div class="photo">
              <img :src="invitation.tree.avatar?.url || constants().DEFAULT_TREE_IMG"
                   alt="family photo"
                   class="avatar-tree-image"/>
            </div>
            <div class="min-w-200">
              <div class="small-gray-text">{{ $t('ui.invitation.tree_name') }}</div>
              <div>{{ invitation.tree.name }}</div>
            </div>
            <div class="min-w-200">
              <div class="small-gray-text">{{ $t('ui.invitation.invitation_from') }}</div>
              {{ invitation.inviter.name }} {{ invitation.inviter.surname }}
              <!-- add created_id -->
            </div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <button-blue classes="rounded-start rounded-end min-w-200 m-r-15"
                         :label="$t('ui.confirm')"
                         icon="fa-regular fa-circle-check"
                         @click="acceptedInvite(invitation)"/>
            <button-white classes="rounded-start rounded-end min-w-200"
                          :label="$t('ui.delete')"
                          icon="fa-solid fa-trash"
                          @click="deleteInvite(invitation)"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import * as constants from "../../../utils/constants";
import ButtonBlue from "../../../components/UI/Buttons/ButtonBlue.vue";
import ButtonWhite from "../../../components/UI/Buttons/ButtonWhite.vue";

export default {
  name: "InvitationCard",
  components: {
    ButtonBlue,
    ButtonWhite,
  },
  computed: {
    ...mapState('user', {
      user: state => state.user,
    }),
  },
  methods: {
    ...mapActions('treeInvitations', {
      onAcceptTreeInvitations: 'onAcceptTreeInvitations',
      onDeleteTreeInvitation: 'onDeleteTreeInvitation',
    }),
    constants() {
      return constants;
    },
    acceptedInvite(invitation) {
      this.onAcceptTreeInvitations({
        id: invitation.id,
        is_accepted: true
      });
    },
    deleteInvite(invitation) {
      this.onDeleteTreeInvitation({
        id: invitation.id,
      });
    },
  },
};
</script>