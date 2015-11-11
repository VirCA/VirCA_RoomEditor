module.exports = function (room) {
    //console.log(room);

        window.$ = window.jQuery = require('jQuery');
    //----------------roomName-------------------
    $('#roomName').val(room['$'].name);
    //console.log(room[]);
    //-----------------environment----------------
    if (room.settings.environment.skybox != undefined) {
        $('#environment_skybox_materialName').val(room.settings.environment.skybox.materialName);
        $('#environment_skybox_distance').val(room.settings.environment.skybox.distance);
    }
    $('#environment_ambientColor_r').val(room.settings.environment.ambientColor.r);
    $('#environment_ambientColor_g').val(room.settings.environment.ambientColor.g);
    $('#environment_ambientColor_b').val(room.settings.environment.ambientColor.b);
    $('#environment_ambientColor_a').val(room.settings.environment.ambientColor.a);
    $('#environment_backgroundColor_r').val(room.settings.environment.backgroundColor.r);
    $('#environment_backgroundColor_g').val(room.settings.environment.backgroundColor.g);
    $('#environment_backgroundColor_b').val(room.settings.environment.backgroundColor.b);
    $('#environment_backgroundColor_a').val(room.settings.environment.backgroundColor.a);
    $('#environment_shader').val(room.settings.environment.shader);
    $('#environment_compositors_bloom').val(room.settings.environment.compositors.Bloom);
    $('#environment_compositors_motionBlur').val(room.settings.environment.compositors.MotionBlur);
    $('#environment_fog_type').val(room.settings.environment.fog.type);
    $('#environment_fog_color_r').val(room.settings.environment.fog.color.r);
    $('#environment_fog_color_g').val(room.settings.environment.fog.color.g);
    $('#environment_fog_color_b').val(room.settings.environment.fog.color.b);
    $('#environment_fog_color_a').val(room.settings.environment.fog.color.a);
    $('#environment_fog_linearStart').val(room.settings.environment.fog.linearStart);
    $('#environment_fog_linearStop').val(room.settings.environment.fog.linearStop);
    $('#environment_fog_expDensity').val(room.settings.environment.fog.expDensity);
    //-----------------pointer----------------
    $('#pointer_visibility').val(room.settings.pointer.visibility);
    $('#pointer_crosshairs').val(room.settings.pointer.crosshairs);
    $('#pointer_length').val(room.settings.pointer.length);
    if (room.settings.pointer.offset != undefined) {
        $('#camera_pointer_offset_x').val(room.settings.pointer.offset.x);
        $('#camera_pointer_offset_y').val(room.settings.pointer.offset.y);
        $('#camera_pointer_offset_z').val(room.settings.pointer.offset.z);
    }
    //-----------------boundaries----------------
    $('#boundaries_xLimit_min').val(room.settings.boundaries.xlimit.min);
    $('#boundaries_xLimit_max').val(room.settings.boundaries.xlimit.max);
    $('#boundaries_yLimit_min').val(room.settings.boundaries.ylimit.min);
    $('#boundaries_yLimit_max').val(room.settings.boundaries.ylimit.max);
    $('#boundaries_zLimit_min').val(room.settings.boundaries.zlimit.min);
    $('#boundaries_zLimit_max').val(room.settings.boundaries.zlimit.max);
    //-----------------camera----------------
    $('#camera_pose_position_x').val(room.settings.camera.pose.position.x);
    $('#camera_pose_position_y').val(room.settings.camera.pose.position.y);
    $('#camera_pose_position_z').val(room.settings.camera.pose.position.z);
    $('#camera_pose_orientation_qx').val(room.settings.camera.pose.orientation.quaternion.x);
    $('#camera_pose_orientation_qy').val(room.settings.camera.pose.orientation.quaternion.y);
    $('#camera_pose_orientation_qz').val(room.settings.camera.pose.orientation.quaternion.z);
    $('#camera_pose_orientation_qw').val(room.settings.camera.pose.orientation.quaternion.w);
    $('#camera_clipping_near').val(room.settings.camera.clipping.near);
    $('#camera_clipping_far').val(room.settings.camera.clipping.far);
    $('#camera_fov').val(room.settings.camera.fov);
    //-----------------browserStartPage----------------
    $('#browserStartPage_url').val(room.settings.browserStartPage.url);
    //-----------------presentation----------------
    if (room.settings.presentation != undefined) {
        $('#presentation_fileName').val(room.settings.presentation.fileName);
        $('#presentation_enabled').val(room.settings.presentation.enabled);
    }
}