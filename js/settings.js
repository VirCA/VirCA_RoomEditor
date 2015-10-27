module.exports = function(room, roomPath) {
    //console.log(room);
    var fs = require("fs");
    var roomGenerator = require("./roomGenerator.js");
    $('#plane').removeClass('hidden').addClass('shown');
    $('#jstree').removeClass('hidden').addClass('shown');


    room = room.room;

    var nodeLength = GetLength(room.content.node);
    var nodeTypes = GetNodeTypes(room.content.node, nodeLength);
    var lightType = GetLightTypes(room.content, nodeLength, nodeTypes);


    var nodesName = GetNodesName(room.content, nodeLength);
    room.settings = GetFullSettings(room.settings);
    room.content.node = GetFullContent(room.content, nodeTypes, nodeLength);

    var Convert2Quaternion = require("./Convert2Quaternion.js");
    for (var i = 0; i < nodeLength; i++) {
        if(room.content.node[i].pose.orientation.quaternion.w == "")
            room.content.node[i].pose.orientation = Convert2Quaternion(room.content.node[i].pose.orientation);
    };

    FirstInit(room, nodeLength, nodeTypes, lightType);

    InitColorsSliders();

    var genRoomButton = document.getElementById("settings_submit");

    $('input, select').on("change", function(){
        console.log("Frissítés történt.");
        GetSettingsObject(room);
        GetContentObject(room, nodeLength, nodeTypes, nodesName);
        room['@'] = {
            name: undefined
        };
        room['@'].name = $('#roomName').val();
        room['$'] = undefined;
        fs.writeFileSync(roomPath, roomGenerator(room));
    });


        $("#treeROOM").on("click", function(){
                HideAll(room, nodeLength);
                $('#RN').removeClass('hidden').addClass('shown');
                //console.log("Clicked");
        });
        $("#treeSETTINGS").on("click", function(){
                HideAll(room, nodeLength);
                $('#environment').removeClass("hidden").addClass("shown");
                $('#pointer').removeClass("hidden").addClass("shown");
                $('#boundaries').removeClass("hidden").addClass("shown");
                $('#camera').removeClass("hidden").addClass("shown");
                $('#browserStartPage').removeClass("hidden").addClass("shown");
                $('#presentation').removeClass("hidden").addClass("shown");
                //console.log("Clicked");
        });
        $("#treeENVIRONMENT").on("click", function(){
                HideAll(room, nodeLength);
                $('#environment').removeClass("hidden").addClass("shown");
        });
        $("#treePOINTER").on("click", function(){
                HideAll(room, nodeLength);
                $('#pointer').removeClass("hidden").addClass("shown");
        });
        $("#treeBOUNDAIRES").on("click", function(){
                HideAll(room, nodeLength);
                $('#boundaries').removeClass("hidden").addClass("shown");
        });
        $("#treeCAMERA").on("click", function(){
                HideAll(room, nodeLength);
                $('#camera').removeClass("hidden").addClass("shown");
        });
        $("#treeBROWSER").on("click", function(){
                HideAll(room, nodeLength);
                $('#browserStartPage').removeClass("hidden").addClass("shown");
        });
        $("#treePRESENTATION").on("click", function(){
                HideAll(room, nodeLength);
                $('#presentation').removeClass("hidden").addClass("shown");
        });
        $("#treeCONTENT").on("click", function(){
                HideAll(room, nodeLength);
                $('#content').removeClass("hidden").addClass("shown");
                for (var i = 0; i < nodeLength; i++) {
                    $('#content_node' + i).removeClass("hidden").addClass("shown");
                }
        });

        $("label").on("click", function(){
            //onsole.log(this.id);
                //HideAll(room, nodeLength);
                var t = 0;
                while(t < nodeLength && this.id != 'treeNODE'+t)
                    ++t;
                if(t < nodeLength){
                   //console.log($('#content_node'+t));
                    HideAll(room, nodeLength);
                     $('#content_node'+t).removeClass("hidden").addClass("shown");
                     $('#content').removeClass("hidden").addClass("shown");
                }
        });
}
   function FirstInit(room, nodeLength, nodeTypes, lightType){
    console.log(room);
        TreeMake(room, nodeLength);
        Initialing(room);
        ContentCreation(room, nodeLength, nodeTypes, lightType);
    }

function HideAll(room, nodeLength) {
    $('#RN').removeClass("shown").addClass("hidden");
    $('#environment').removeClass("shown").addClass("hidden");
    $('#pointer').removeClass("shown").addClass("hidden");
    $('#boundaries').removeClass("shown").addClass("hidden");
    $('#camera').removeClass("shown").addClass("hidden");
    $('#browserStartPage').removeClass("shown").addClass("hidden");
    $('#presentation').removeClass("shown").addClass("hidden");
    $('#content').removeClass("shown").addClass("hidden");
    for (var i = 0; i < nodeLength; i++) {
        $('#content_node' + i).removeClass("shown").addClass("hidden");
    }
}

function GetSettingsObject(room) {
    //-----------------environment----------------
    if (room.settings.environment.skybox != undefined) {
        room.settings.environment.skybox.materialName = $('#environment_skybox_materialName').val();
        room.settings.environment.skybox.distance = $('#environment_skybox_distance').val();
    }
    else {
        room.settings.environment.skybox = {};
        room.settings.environment.skybox.materialName = $('#environment_skybox_materialName').val();
        room.settings.environment.skybox.distance = $('#environment_skybox_distance').val();
    }
    room.settings.environment.ambientColor.r = $('#environment_ambientColor_r').val();
    room.settings.environment.ambientColor.g = $('#environment_ambientColor_g').val();
    room.settings.environment.ambientColor.b = $('#environment_ambientColor_b').val();
    room.settings.environment.ambientColor.a = $('#environment_ambientColor_a').val();
    room.settings.environment.backgroundColor.r = $('#environment_backgroundColor_r').val();
    room.settings.environment.backgroundColor.g = $('#environment_backgroundColor_g').val();
    room.settings.environment.backgroundColor.b = $('#environment_backgroundColor_b').val();
    room.settings.environment.backgroundColor.a = $('#environment_backgroundColor_a').val();
    room.settings.environment.shader = $('#environment_shader').val();
    room.settings.environment.compositors.Bloom = $('#environment_compositors_bloom').val();
    room.settings.environment.compositors.MotionBlur = $('#environment_compositors_motionBlur').val();
    room.settings.environment.fog.type = $('#environment_fog_type').val();
    room.settings.environment.fog.color.r = $('#environment_fog_color_r').val();
    room.settings.environment.fog.color.g = $('#environment_fog_color_g').val();
    room.settings.environment.fog.color.b = $('#environment_fog_color_b').val();
    room.settings.environment.fog.color.a = $('#environment_fog_color_a').val();
    room.settings.environment.fog.linearStart = $('#environment_fog_linearStart').val();
    room.settings.environment.fog.linearStop = $('#environment_fog_linearStop').val();
    room.settings.environment.fog.expDensity = $('#environment_fog_expDensity').val();
    //-----------------pointer----------------
    room.settings.pointer.visibility = $('#pointer_visibility').val();
    room.settings.pointer.crosshairs = $('#pointer_crosshairs').val();
    room.settings.pointer.length = $('#pointer_length').val();
    room.settings.pointer.offset.x = $('#camera_pointer_offset_x').val();
    room.settings.pointer.offset.y = $('#camera_pointer_offset_y').val();
    room.settings.pointer.offset.z = $('#camera_pointer_offset_z').val();
    //-----------------boundaries----------------
    room.settings.boundaries.xlimit.min = $('#boundaries_xLimit_min').val();
    room.settings.boundaries.xlimit.max = $('#boundaries_xLimit_max').val();
    room.settings.boundaries.ylimit.min = $('#boundaries_yLimit_min').val();
    room.settings.boundaries.ylimit.max = $('#boundaries_yLimit_max').val();
    room.settings.boundaries.zlimit.min = $('#boundaries_zLimit_min').val();
    room.settings.boundaries.zlimit.max = $('#boundaries_zLimit_max').val();
    //-----------------camera----------------
    room.settings.camera.pose.position.x = $('#camera_pose_position_x').val();
    room.settings.camera.pose.position.y = $('#camera_pose_position_y').val();
    room.settings.camera.pose.position.z = $('#camera_pose_position_z').val();
    room.settings.camera.pose.orientation.quaternion.x = $('#camera_pose_orientation_qx').val();
    room.settings.camera.pose.orientation.quaternion.y = $('#camera_pose_orientation_qy').val();
    room.settings.camera.pose.orientation.quaternion.z = $('#camera_pose_orientation_qz').val();
    room.settings.camera.pose.orientation.quaternion.w = $('#camera_pose_orientation_qw').val();
    room.settings.camera.clipping.far = $('#camera_clipping_near').val();
    room.settings.camera.clipping.far = $('#camera_clipping_far').val();
    room.settings.camera.fov = $('#camera_fov').val();
    //-----------------browserStartPage----------------
    room.settings.browserStartPage.url = $('#browserStartPage_url').val();
    //-----------------presentation----------------
    if (room.settings.presentation != undefined) {
        room.settings.presentation.fileName = $('#presentation_fileName').val();
        room.settings.presentation.enabled = $('#presentation_enabled').val();
    }
    else {
        room.settings.presentation = {};
        room.settings.presentation.fileName = $('#presentation_fileName').val();
        room.settings.presentation.enabled = $('#presentation_enabled').val();
    }
}
function GetContentObject(room, nodeLength, nodeTypes, nodesName) {
    for (var i = 0; i < nodeLength; i++) {
        //---------pose_position-----
        room.content.node[i]['@'] = {
            name: undefined
        };
        // room.content.node[i]['$'].name = "";
        //nodesName = GetNodesName(room.content, nodeLength);
        room.content.node[i]['@'].name = $('#content_node' + i + '_nameValue').val();
        //console.log(nodesName[0]);
        //console.log(room.content.node[0]['$'].name);
        room.content.node[i]['$'].name = "";
        room.content.node[i].pose.position.x = $('#content_node' + i + '_pose_position_x').val();
        room.content.node[i].pose.position.y = $('#content_node' + i + '_pose_position_y').val();
        room.content.node[i].pose.position.z = $('#content_node' + i + '_pose_position_z').val();
        //---------pose_orientation--------

        room.content.node[i].pose.orientation.quaternion.x = $('#node' + i + '_pose_orientation_qx').val();
        room.content.node[i].pose.orientation.quaternion.y = $('#node' + i + '_pose_orientation_qy').val();
        room.content.node[i].pose.orientation.quaternion.z = $('#node' + i + '_pose_orientation_qz').val();
        room.content.node[i].pose.orientation.quaternion.w = $('#node' + i + '_pose_orientation_qw').val();

            room.content.node[i].scale.x = $('#room_content_node' + i + '_scale_x').val();
            room.content.node[i].scale.y = $('#room_content_node' + i + '_scale_y').val();
            room.content.node[i].scale.z = $('#room_content_node' + i + '_scale_z').val();


        //--------------types-----------
        if (nodeTypes[i] == "node") {
            room.content.node[i].entity.meshFileName = $('#room_content_node' + i + '_entity_meshFileName').val();
            room.content.node[i].entity.castShadows = $('#room_content_node' + i + '_entity_castShadows').val();

        }
        else if (nodeTypes[i] == "browser") {
            room.content.node[i].browser.url = $('#room_content_node' + i + '_browser_url').val();
            room.content.node[i].browser.shared = $('#room_content_node' + i + '_browser_shared').val();
            room.content.node[i].browser.draggable = $('#room_content_node' + i + '_browser_draggable').val();
            room.content.node[i].browser.snappedToWall = $('#room_content_node' + i + '_browser_snappedToWall').val();
            room.content.node[i].browser.width = $('#room_content_node' + i + '_browser_width').val();
            room.content.node[i].browser.height = $('#room_content_node' + i + '_browser_height').val();
            room.content.node[i].browser.resH = $('#room_content_node' + i + '_browser_resH').val();
            room.content.node[i].browser.resV = $('#room_content_node' + i + '_browser_resV').val();
            room.content.node[i].browser.zoom = $('#room_content_node' + i + '_browser_zoom').val();
        }
        else if (nodeTypes[i] == "light") {
            room.content.node[i].light.diffuse.r = $('#room_content_node' + i + '_light_diffuse_r').val();
            room.content.node[i].light.diffuse.g = $('#room_content_node' + i + '_light_diffuse_g').val();
            room.content.node[i].light.diffuse.b = $('#room_content_node' + i + '_light_diffuse_b').val();
            room.content.node[i].light.diffuse.a = $('#room_content_node' + i + '_light_diffuse_a').val();
            room.content.node[i].light.specular.r = $('#room_content_node' + i + '_light_specular_r').val();
            room.content.node[i].light.specular.g = $('#room_content_node' + i + '_light_specular_g').val();
            room.content.node[i].light.specular.b = $('#room_content_node' + i + '_light_specular_b').val();
            room.content.node[i].light.specular.a = $('#room_content_node' + i + '_light_specular_a').val();
            room.content.node[i].light.offset.x = $('#room_content_node' + i + '_light_offset_x').val();
            room.content.node[i].light.offset.y = $('#room_content_node' + i + '_light_offset_y').val();
            room.content.node[i].light.offset.z = $('#room_content_node' + i + '_light_offset_z').val();
            if ($('#room_content_node' + i + '_light_type').val() == "p") {
                room.content.node[i].light.type.point.attenuation.range = $('#room_content_node' + i + '_light_type_point_attenuation_range').val();
                room.content.node[i].light.type.point.attenuation.manual.constant = $('#room_content_node' + i + '_light_type_point_attenuation_manual_constant').val();
                room.content.node[i].light.type.point.attenuation.manual.linear = $('#room_content_node' + i + '_light_type_point_attenuation_manual_linear').val();
                room.content.node[i].light.type.point.attenuation.manual.quadratic = $('#room_content_node' + i + '_light_type_point_attenuation_manual_quadratic').val();

                room.content.node[i].light.type.directional.direction.x = undefined;
                room.content.node[i].light.type.directional.direction.y = undefined;
                room.content.node[i].light.type.directional.direction.z = undefined;

                room.content.node[i].light.type.spot.attenuation.range = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.constant = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.linear = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.quadratic = undefined;
                room.content.node[i].light.type.spot.range.inner = undefined;
                room.content.node[i].light.type.spot.range.outer = undefined;
                room.content.node[i].light.type.spot.range.falloff = undefined;
                room.content.node[i].light.type.spot.direction.x = undefined;
                room.content.node[i].light.type.spot.direction.y = undefined;
                room.content.node[i].light.type.spot.direction.z = undefined;

            }
            else if ($('#room_content_node' + i + '_light_type').val() == "s") {
                room.content.node[i].light.type.spot.attenuation.range = $('#room_content_node' + i + '_light_type_spot_attenuation_range').val();
                room.content.node[i].light.type.spot.attenuation.manual.constant = $('#room_content_node' + i + '_light_type_spot_attenuation_manual_constant').val();
                room.content.node[i].light.type.spot.attenuation.manual.linear = $('#room_content_node' + i + '_light_type_spot_attenuation_manual_linear').val();
                room.content.node[i].light.type.spot.attenuation.manual.quadratic = $('#room_content_node' + i + '_light_type_spot_attenuation_manual_quadratic').val();
                room.content.node[i].light.type.spot.range.inner = $('#room_content_node' + i + '_light_type_spot_range_inner').val();
                room.content.node[i].light.type.spot.range.outer = $('#room_content_node' + i + '_light_type_spot_range_outer').val();
                room.content.node[i].light.type.spot.range.falloff = $('#room_content_node' + i + '_light_type_spot_range_falloff').val();
                room.content.node[i].light.type.spot.direction.x = $('#room_content_node' + i + '_light_type_spot_direction_x').val();
                room.content.node[i].light.type.spot.direction.y = $('#room_content_node' + i + '_light_type_spot_direction_y').val();
                room.content.node[i].light.type.spot.direction.z = $('#room_content_node' + i + '_light_type_spot_direction_z').val();

                room.content.node[i].light.type.point.attenuation.range = undefined;
                room.content.node[i].light.type.point.attenuation.manual.constant = undefined;
                room.content.node[i].light.type.point.attenuation.manual.linear = undefined;
                room.content.node[i].light.type.point.attenuation.manual.quadratic = undefined;

                room.content.node[i].light.type.directional.direction.x = undefined;
                room.content.node[i].light.type.directional.direction.y = undefined;
                room.content.node[i].light.type.directional.direction.z = undefined;
            }
            else if ($('#room_content_node' + i + '_light_type').val() == "d") {
                room.content.node[i].light.type.directional.direction.x = $('#room_content_node' + i + '_light_type_directional_direction_x').val();
                room.content.node[i].light.type.directional.direction.y = $('#room_content_node' + i + '_light_type_directional_direction_y').val();
                room.content.node[i].light.type.directional.direction.z = $('#room_content_node' + i + '_light_type_directional_direction_z').val();

                room.content.node[i].light.type.point.attenuation.range = undefined;
                room.content.node[i].light.type.point.attenuation.manual.constant = undefined;
                room.content.node[i].light.type.point.attenuation.manual.linear = undefined;
                room.content.node[i].light.type.point.attenuation.manual.quadratic = undefined;

                room.content.node[i].light.type.spot.attenuation.range = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.constant = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.linear = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.quadratic = undefined;
                room.content.node[i].light.type.spot.range.inner = undefined;
                room.content.node[i].light.type.spot.range.outer = undefined;
                room.content.node[i].light.type.spot.range.falloff = undefined;
                room.content.node[i].light.type.spot.direction.x = undefined;
                room.content.node[i].light.type.spot.direction.y = undefined;
                room.content.node[i].light.type.spot.direction.z = undefined;
            }
        }
        else if (nodeTypes[i] == "figure") {
            room.content.node[i].figure.width = $('#room_content_node' + i + '_figure_width').val();
            room.content.node[i].figure.height = $('#room_content_node' + i + '_figure_height').val();
            room.content.node[i].figure.materialName = $('#room_content_node' + i + '_figure_materialName').val();
            room.content.node[i].figure.castShadows = $('#room_content_node' + i + '_figure_castShadows').val();
            room.content.node[i].figure.draggable = $('#room_content_node' + i + '_figure_draggable').val();
        }
        else if (nodeTypes[i] == "plane") {
            room.content.node[i].plane.width = $('#room_content_node' + i + '_plane_width').val();
            room.content.node[i].plane.height = $('#room_content_node' + i + '_plane_height').val();
            room.content.node[i].plane.materialName = $('#room_content_node' + i + '_plane_materialName').val();
            room.content.node[i].plane.movablePlane = $('#room_content_node' + i + '_plane_movablePlane').val();
            room.content.node[i].plane.distance = $('#room_content_node' + i + '_plane_distance').val();
            room.content.node[i].plane.xSegment = $('#room_content_node' + i + '_plane_xSegment').val();
            room.content.node[i].plane.ySegment = $('#room_content_node' + i + '_plane_ySegment').val();
            room.content.node[i].plane.numTexCoordSets = $('#room_content_node' + i + '_plane_numTexCoordSets').val();
            room.content.node[i].plane.uTile = $('#room_content_node' + i + '_plane_uTile').val();
            room.content.node[i].plane.vTile = $('#room_content_node' + i + '_plane_vTile').val();
            room.content.node[i].plane.normals = $('#room_content_node' + i + '_plane_normals').val();
            room.content.node[i].plane.tangents = $('#room_content_node' + i + '_plane_tangents').val();
            room.content.node[i].plane.castShadows = $('#room_content_node' + i + '_plane_castShadows').val();
            room.content.node[i].plane.normal.x = $('#room_content_node' + i + '_plane_normal_x').val();
            room.content.node[i].plane.normal.y = $('#room_content_node' + i + '_plane_normal_y').val();
            room.content.node[i].plane.normal.z = $('#room_content_node' + i + '_plane_normal_z').val();
            room.content.node[i].plane.upVector.x = $('#room_content_node' + i + '_plane_upVector_x').val();
            room.content.node[i].plane.upVector.y = $('#room_content_node' + i + '_plane_upVector_y').val();
            room.content.node[i].plane.upVector.z = $('#room_content_node' + i + '_plane_upVector_z').val();
        }
    }
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}


function Initialing (room) {
    //console.log(room);

        window.$ = window.jQuery = require('jQuery');
    //----------------roomName-------------------
    $('#roomName').val(room['$'].name);
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
function ContentCreation(room, nodeLength, nodeTypes, lightType) {
    //console.log(room.content.node[37]);
    var p = 0;
    for (var i = 0; i < nodeLength; ++i) {
        $('#content').append('<div class="hidden" id="content_node' + i + '"></div>');//content_node1
        $('#content_node' + i).append('<div class="first" id="content_node' + i + '_name"><label>Node name:</label><input type="text" class"tex" id="content_node' + i + '_nameValue" value="' + room.content.node[i]['$'].name + '"></div>');//content_node1_nameValue
        $('#content_node' + i).append('<div class="second" id="content_node' + i + '_pose"><label>Pose:</label></div>');//content_node1_pose
        $('#content_node' + i + '_pose').append('<div class="third" id="content_node' + i + '_pose_position"><label>Position:</label><br><div class="fourth" id="content_node' + i + '_pose_positionValues"></div></div>');//content_node1_pose_position && content_node1_pose_positionValues
        $('#content_node' + i + '_pose_positionValues').append('<label>x:</label><input class="nums" type="number" id="content_node' + i + '_pose_position_x" value="' + room.content.node[i].pose.position.x + '"><br>');//content_node1_pose_position_x
        $('#content_node' + i + '_pose_positionValues').append('<label>y:</label><input class="nums" type="number" id="content_node' + i + '_pose_position_y" value="' + room.content.node[i].pose.position.y + '"><br>');//content_node1_pose_position_y
        $('#content_node' + i + '_pose_positionValues').append('<label>z:</label><input class="nums" type="number" id="content_node' + i + '_pose_position_z" value="' + room.content.node[i].pose.position.z + '"><br>'); //content_node1_pose_position_z
        $('#content_node' + i + '_pose').append('<div id="content_node'+i+'_pose_orientations" class="third"><label>Orientation:</label></div>');//content_node1_pose_orientetion
        $('#content_node' + i + '_pose_orientations').append(
            '<div class="fourth">' +
            '   <div id="node' + i + '_quaternion">' +
            '       <label>x: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_qx" value="' + room.content.node[i].pose.orientation.quaternion.x + '"><br>' +
            '       <label>y: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_qy" value="' + room.content.node[i].pose.orientation.quaternion.y + '"><br>' +
            '       <label>z: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_qz" value="' + room.content.node[i].pose.orientation.quaternion.z + '"><br>' +
            '       <label>w: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_qw" value="' + room.content.node[i].pose.orientation.quaternion.w + '"><br> ' +
            '   </div>'+
            '</div>'
        );
         $('#content_node' + i).append(
                '<div class="second">' +
                '   <label>Scales:</label><br>' +
                '       <div class ="third">' +
                '           <label>x:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_scale_x" value="' + room.content.node[i].scale.x + '"><br>' +
                '           <label>y:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_scale_y" value="' + room.content.node[i].scale.y + '"><br>' +
                '           <label>z:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_scale_z" value="' + room.content.node[i].scale.z + '"><br>' +
                '       </div>' +
                '</div>'
                );
        if (nodeTypes[i] == "node") {

            $('#content_node' + i).append(
                '<div class="second">' +
                '   <label>Entity:</label>' +
                '   <div class="third">' +
                '       <label>Mesh File Name:</label>' +
                '       <input type="text" class="tex" id="room_content_node' + i + '_entity_meshFileName" value="' + room.content.node[i].entity.meshFileName + '">' +
                '       <label>Cast Shadows:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_entity_castShadows">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   </div>' +
                '</div>'
                );
            $('#room_content_node' + i + '_entity_castShadows').val(room.content.node[i].entity.castShadows);

        }
        else if (nodeTypes[i] == "light") {
            $('#content_node' + i).append(
                '<div class="second">' +
                '   <label>Light</label>' +
                '   <div class="third">' +
                '       <label>Diffuse</label>' +
                '       <div class="fourth">' +
                '           <label>r:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_diffuse_r" value="' + room.content.node[i].light.diffuse.r + '"><br>' +
                '           <label>g:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_diffuse_g" value="' + room.content.node[i].light.diffuse.g + '"><br>' +
                '           <label>b:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_diffuse_b" value="' + room.content.node[i].light.diffuse.b + '"><br>' +
                '           <label>a:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_diffuse_a" value="' + room.content.node[i].light.diffuse.a + '"><br>' +
                '       </div>' +
                '        <label>Specular</label>' +
                '       <div class="fourth">' +
                '           <label>r:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_specular_r" value="' + room.content.node[i].light.specular.r + '"><br>' +
                '           <label>g:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_specular_g" value="' + room.content.node[i].light.specular.g + '"><br>' +
                '           <label>b:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_specular_b" value="' + room.content.node[i].light.specular.b + '"><br>' +
                '           <label>a:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_specular_a" value="' + room.content.node[i].light.specular.a + '"><br>' +
                '       </div>' +
                '       <label>Offset</label>' +
                '       <div class="fourth">' +
                '           <label>x:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_offset_x" value="' + room.content.node[i].light.offset.x + '"><br>' +
                '           <label>y:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_offset_y" value="' + room.content.node[i].light.offset.y + '"><br>' +
                '           <label>z:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_offset_z" value="' + room.content.node[i].light.offset.z + '"><br>' +
                '       </div>' +
                '       <label>Cast Shadows:</label>' +
                '       <select class="tex" id="content_node' + i + '_light_castShadows">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   </div>' +
                '</div>'
                );
            $('#content_node' + i + '_light_castShadows').val(room.content.node[i].light.castShadows);


            if (lightType[p] == 'spot') {
                $('#content_node' + i).append(
                '<div class="second">' +
                '      <label>Spot:</label> '+
                '     <div class="third" id="room_content_node' + i + '_light_type_spot">' +
                '       <label>Range:</label>' +
                '       <div class="fourth">' +
                '           <label>Inner: </label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_range_inner" value="' + room.content.node[i].light.type.spot.range.inner + '"><br>' +
                '           <label>Outer: </label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_range_outer" value="' + room.content.node[i].light.type.spot.range.outer + '"><br>' +
                '           <label>Fall off: </label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_range_falloff" value="' + room.content.node[i].light.type.spot.range.falloff + '"><br>' +
                '       </div>' +
                '       <label>Attenuation: </label>' +
                '       <div class="fourth">' +
                '           <label>Range:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_attenuation_range" value="' + room.content.node[i].light.type.spot.attenuation.range + '"><br>' +
                '           <label>Manual: </label>' +
                '           <div class="fifth">' +
                '               <label>Constant:</label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_attenuation_manual_constant" value="' + room.content.node[i].light.type.spot.attenuation.manual.constant + '"><br>' +
                '               <label>Linear: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_attenuation_manual_linear" value="' + room.content.node[i].light.type.spot.attenuation.manual.linear + '"><br>' +
                '               <label>Quadratic: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_attenuation_manual_quadratic" value="' + room.content.node[i].light.type.spot.attenuation.manual.quadratic + '"><br> ' +
                '           </div>' +
                '       </div>' +
                '       <label>Direction: </label>' +
                '           <div class="fourth">' +
                '               <label>x:</label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_direction_x" value="' + room.content.node[i].light.type.spot.direction.x + '"><br>' +
                '               <label>y: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_direction_y" value="' + room.content.node[i].light.type.spot.direction.y + '"><br>' +
                '               <label>z: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_direction_z" value="' + room.content.node[i].light.type.spot.direction.z + '"><br> ' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>'
            );
            }
            else if (lightType[p] == 'point') {
               $('#content_node' + i).append(
                '<div class="second">' +
                '      <label>Point:</label> '+
                '   <div class="third" id="room_content_node' + i + '_light_type_point">' +
                '       <label>Attenuation: </label>' +
                '       <div class="fourth">' +
                '           <label>Range:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_point_attenuation_range" value="' + room.content.node[i].light.type.point.attenuation.range + '"><br>' +
                '           <label>Manual: </label>' +
                '           <div class="fifth">' +
                '               <label>Constant:</label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_point_attenuation_manual_constant" value="' + room.content.node[i].light.type.point.attenuation.manual.constant + '"><br>' +
                '               <label>Linear: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_point_attenuation_manual_linear" value="' + room.content.node[i].light.type.point.attenuation.manual.linear + '"><br>' +
                '               <label>Quadratic: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_point_attenuation_manual_quadratic" value="' + room.content.node[i].light.type.point.attenuation.manual.quadratic + '"><br> ' +
                '           </div>' +
                '       </div>' +
                '   </div>'+
                '</div>'
                );
            }
            else if (lightType[p] == 'directional') {
                $('#content_node' + i).append(
                '<div class="second">' +
                '      <label>Directional:</label> '+
                '   <div class="third" id="room_content_node' + i + '_light_type_directional">' +
                '       <label>Direction: </label>' +
                '           <div class="fourth">' +
                '               <label>x:</label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_directional_direction_x" value="' + room.content.node[i].light.type.directional.direction.x + '"><br>' +
                '               <label>y: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_directional_direction_y" value="' + room.content.node[i].light.type.directional.direction.y + '"><br>' +
                '               <label>z: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_directional_direction_z" value="' + room.content.node[i].light.type.directional.direction.z + '"><br> ' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>'
            );
            }
            ++p;
        }
        else if (nodeTypes[i] == "browser") {
            $('#content_node' + i).append(
                '<label>Browser:</label>' +
                '<div class="second">' +
                '   <label>url:</label>' +
                '   <input class="tex" type="text" id="room_content_node' + i + '_browser_url" value="' + room.content.node[i].browser.url + '"><br><br>' +
                '   <label>Shared:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_browser_shared">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Draggable:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_browser_draggable">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Snapped to wall:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_browser_snappedToWall">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Width:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_width" value="' + room.content.node[i].browser.width + '"><br>' +
                '   <label>Height:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_height" value="' + room.content.node[i].browser.height + '"><br>' +
                '   <label>Resolution Horisontal:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_resH" value="' + room.content.node[i].browser.resH + '"><br>' +
                '   <label>Resolution Vertical:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_resV" value="' + room.content.node[i].browser.resV + '"><br>' +
                '   <label>Zoom:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_zoom" value="' + room.content.node[i].browser.zoom + '"><br>' +
                '</div>'
                );

            $('#room_content_node' + i + '_browser_shared').val(room.content.node[i].browser.shared);
            $('#room_content_node' + i + '_browser_draggable').val(room.content.node[i].browser.draggable);
            $('#room_content_node' + i + '_browser_snappedToWall').val(room.content.node[i].browser.snappedToWall);
        }
        else if (nodeTypes[i] == "figure") {
            $('#content_node' + i).append(
                '<label>Figure:</label>' +
                '<div class="second">' +
                '   <label>Width:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_figure_width" value="' + room.content.node[i].figure.width + '"><br>' +
                '   <label>Height:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_figure_height" value="' + room.content.node[i].figure.height + '"><br>' +
                '   <label>Material Name: </label>' +
                '   <input type="text" class="tex" id="room_content_node' + i + '_figure_materialName" value="' + room.content.node[i].figure.materialName + '"><br>' +
                '   <label>Draggable:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_figure_draggable">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Cast Shadows:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_figure_castShadows">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '</div>'
                );

            $('#room_content_node' + i + '_figure_draggable').val(room.content.node[i].figure.draggable);
            $('#room_content_node' + i + '_figure_castShadows').val(room.content.node[i].figure.castShadows);
        }
        else if (nodeTypes[i] == "plane") {
            //console.log("Nodetypes: "+nodeTypes[i]+ "  + "+i);
            //console.log(room.content.node[i].plane);
            $('#content_node' + i).append(
                '<label>Plane:</label>' +
                '<div class="second">' +
                '   <label>Width:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_width" value="' + room.content.node[i].plane.width + '"><br>' +
                '   <label>Height:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_height" value="' + room.content.node[i].plane.height + '"><br>' +
                '   <label>Material Name: </label>' +
                '   <input type="text" class="tex" id="room_content_node' + i + '_plane_materialName" value="' + room.content.node[i].plane.materialName + '">' +

                '   <label>Movable Plane: </label>' +
                '       <select class="tex" id="room_content_node' + i + '_plane_movablePlane">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Distance:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_distance" value="' + room.content.node[i].plane.distance + '"><br>' +
                '   <label>xSegment:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_xSegment" value="' + room.content.node[i].plane.xSegment + '"><br>' +
                '   <label>ySegment:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_ySegment" value="' + room.content.node[i].plane.ySegment + '"><br>' +
                '   <label>NumTexCoordSets:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_numTexCoordSets" value="' + room.content.node[i].plane.numTexCoordSets + '"><br>' +
                '   <label>uTile:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_uTile" value="' + room.content.node[i].plane.uTile + '"><br>' +
                '   <label>vTile:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_vTile" value="' + room.content.node[i].plane.vTile + '"><br>' +
                '   <label>Normals: </label>' +
                '       <select class="tex" id="room_content_node' + i + '_plane_normals">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Tangents: </label>' +
                '       <select class="tex" id="room_content_node' + i + '_plane_tangents">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +

                '   <label>Cast Shadows:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_plane_castShadows">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Normal:</label>' +
                '   <div class="third">' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_normal_x" value="' + room.content.node[i].plane.normal.x + '"><br>' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_normal_y" value="' + room.content.node[i].plane.normal.y + '"><br>' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_normal_z" value="' + room.content.node[i].plane.normal.z + '"><br>' +
                '   </div>' +
                '   <label>upVector:</label>' +
                '   <div class="third">' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_upVector_x" value="' + room.content.node[i].plane.upVector.x + '"><br>' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_upVector_y" value="' + room.content.node[i].plane.upVector.y + '"><br>' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_upVector_z" value="' + room.content.node[i].plane.upVector.z + '"><br>' +
                '   </div>' +
                '   ' +
                '</div>'

                );
            $('#room_content_node' + i + '_plane_normals').val(room.content.node[i].plane.normals);
            $('#room_content_node' + i + '_plane_tangents').val(room.content.node[i].plane.tangents);
            $('#room_content_node' + i + '_plane_castShadows').val(room.content.node[i].plane.castShadows);
            $('#room_content_node' + i + '_plane_movablePlane').val(room.content.node[i].plane.movablePlane);
        }




    }
}

function TreeMake(room, nodeLength){
        for (var i = 0; i < nodeLength; i++) {
            $('#treeCONTENTNODE').append(
                '<li> <label class="btn btn-warning fa" id="treeNODE'+i+'">'+room.content.node[i]['$'].name)+'</label>'
        }
}

function GetLength(node){
    var nodeLength = 0;
    while(node[nodeLength] != undefined){
        nodeLength ++;
    }
    return nodeLength;
}

function GetNodeTypes(node, nodeLength){
    var nodeTypes = [];
    for (var i = 0; i < nodeLength; i++) {
            if(node[i].browser != undefined)
                nodeTypes[i] = "browser";
            else if(node[i].light != undefined)
                nodeTypes[i] = "light";
            else if(node[i].plane != undefined)
                nodeTypes[i] = "plane";
            else if(node[i].figure != undefined)
                nodeTypes[i] = "figure";
            else
                nodeTypes[i] = "node";
    }
    return nodeTypes;
}

function GetFullSettings(settings){
    temp = require("./settingsObject.js");
    RecursionLeavesModifier(temp, settings);
    return temp;
}
function RecursionLeavesModifier(temp, settings) {
    for (var param in settings) {
        if (typeof settings[param] === "object") {
            RecursionLeavesModifier(temp[param], settings[param])
        }
        else {
           // console.log(temp[param]+"\n");
            temp[param] = settings[param];
           // console.log("beléptem\n");
        }
    }
}

function GetFullContent(content, nodeTypes, nodeLength){
    var contFinally = [];
    var temp = {};

    //console.log(content);
    for(var i = 0; i < nodeLength; ++i){
       //console.log(content);
       temp = null;
        if(nodeTypes[i] == "node"){
            var d = require("./ContentObjects/nodeObject.js");
            temp = new d;
            RecursionLeavesModifier(temp, content.node[i]);

            contFinally.push(JSON.parse(JSON.stringify(temp)));
        }
        else if(nodeTypes[i] == "plane"){
           // console.log(content.node[i].plane);
            var d = require("./ContentObjects/planeObject.js");
            temp = new d;
            RecursionLeavesModifier(temp, content.node[i]);
            contFinally.push(JSON.parse(JSON.stringify(temp)));
            // console.log(contFinally[i].plane);
        }
        else if(nodeTypes[i] == "browser"){
            var d = require("./ContentObjects/browserObject.js");
            temp = new d;
            RecursionLeavesModifier(temp, content.node[i]);
            contFinally.push(JSON.parse(JSON.stringify(temp)));
        }
        else if(nodeTypes[i] == "light"){
            var d = require("./ContentObjects/lightObject.js");
            temp = new d;
            RecursionLeavesModifier(temp, content.node[i]);
            contFinally.push(JSON.parse(JSON.stringify(temp)));
        }
        else if(nodeTypes[i] == "figure"){
            var d = require("./ContentObjects/figureObject.js");
            temp = new d;
            RecursionLeavesModifier(temp, content.node[i]);
            contFinally.push(JSON.parse(JSON.stringify(temp)));
        }
    }
    //console.log(contFinally);
    return contFinally;
   //console.log(contFinally);
}

function GetLightTypes(content, nodeLength, nodeTypes){
    var lightType = [];
    for(var i = 0; i < nodeLength; i++){
        if(nodeTypes[i] == "light"){
            //console.log(content.node[i]+ " "+nodeTypes[i]);
            if(content.node[i].light.type.spot != undefined){
                lightType.push("spot");
            }
            else if(content.node[i].light.type.directional != undefined){
                lightType.push("directional");
            }
            else if(content.node[i].light.type.point != undefined){
                lightType.push("point");
            }
        }
    }
    return lightType;
}

function GetNodesName(content, nodeLength){
    var nodeNames = [];
    for(var i = 0; i < nodeLength; ++i){
        nodeNames[i] = content.node[i]['$'].name;
    }
    return nodeNames;
}

function InitColorsSliders(){
  ColorFunc("demoBack", "environment_backgroundColor_r", "environment_backgroundColor_g", "environment_backgroundColor_b", "environment_backgroundColor_a");
  ColorFunc("demoAmbi", "environment_ambientColor_r", "environment_ambientColor_g", "environment_ambientColor_b", "environment_ambientColor_a");
  ColorFunc("demoFog", "environment_fog_color_r", "environment_fog_color_g", "environment_fog_color_b", "environment_fog_color_a");
  SliderFunc("sliderDist", "environment_skybox_distance", 0, 10000, 1);
  SliderFunc("sliderLINSTART", "environment_fog_linearStart", 0, 5000, 1);
  SliderFunc("sliderLINSTOP", "environment_fog_linearStop", 0, 5000, 1);
  SliderFunc("sliderEXP", "environment_fog_expDensity", 0, 1, 0.001);
  SliderFunc("sliderLENGTH", "pointer_length", 0, 10000,  1);
  SliderFunc("sliderXMIN", "boundaries_xLimit_min", -5000, 5000, 1);
  SliderFunc("sliderXMAX", "boundaries_xLimit_max", -5000, 5000, 1);
  SliderFunc("sliderYMIN", "boundaries_yLimit_min", -5000, 5000, 1);
  SliderFunc("sliderYMAX", "boundaries_yLimit_max", -5000, 5000, 1);
  SliderFunc("sliderZMIN", "boundaries_zLimit_min", -5000, 5000, 1);
  SliderFunc("sliderZMAX", "boundaries_zLimit_max", -5000, 5000, 1);
  SliderFunc("sliderNEAR", "camera_clipping_near", 0, 1000, 1);
  SliderFunc("sliderFAR", "camera_clipping_far", 0, 10000, 1);
  SliderFunc("sliderFOV", "camera_fov", 0, 500, 1);
}

function SliderFunc(sliderID, changingID, minVal, maxVal, stepVal){
  window.$ = window.jQuery = require('jQuery');
  var Slider = require('bootstrap-slider');

  var mySlider = new Slider('#'+sliderID);//$('#'+changingID).val()
  mySlider.setValue(parseInt($('#'+changingID).val()));
  mySlider.options.min = minVal;
  mySlider.options.max = maxVal;
  mySlider.options.step = stepVal;
  //console.log(mySlider);
  //console.log(mySlider.getValue());
  $("#"+changingID).on('change', function(){
    mySlider.setValue(parseInt($('#'+changingID).val()));
  });
  mySlider.on('change', function(){
    $("#"+changingID).val(mySlider.getValue());
    $("#"+changingID).trigger('change');
  });
}


function ColorFunc(model, r, g, b, a){
  window.$ = window.jQuery = require('jQuery');
  require("./../bootstrap-colorpicker-master/dist/js/bootstrap-colorpicker.js");
  $(function(){
      $('.'+model).colorpicker({
        format: "rgba"
      });
      var value = 'rgba('+ $("#"+r).val()*255 +', '+$("#"+g).val()*255 +', '+$("#"+b).val()*255 + ', ' +$("#"+a).val()*255 + ')';
      console.log(value);
      $('.'+model).colorpicker('setValue', value);
      console.log($('.'+model).colorpicker('getValue'));
      $("."+model).colorpicker().on('changeColor.colorpicker', function(event){
        var changedValue = $("."+model).colorpicker('getValue');
        var colors = {};
        colors.r = Math.round((changedValue.substring(changedValue.indexOf("(")+1, changedValue.indexOf(","))/255)*1000)/1000;
        changedValue = changedValue.substring(changedValue.indexOf(",")+1);
        colors.g = Math.round((changedValue.substring(0, changedValue.indexOf(","))/255)*1000)/1000;
        changedValue = changedValue.substring(changedValue.indexOf(",")+1);
        colors.b = Math.round((changedValue.substring(0, changedValue.indexOf(","))/255)*1000)/1000;
        changedValue = changedValue.substring(changedValue.indexOf(",")+1);
        colors.a = Math.round((changedValue.substring(0, changedValue.indexOf(")")))*1000)/1000;

        $("#"+ r).val(colors.r);
        $("#"+ g).val(colors.g);
        $("#"+ b).val(colors.b);
        $("#"+a).val(colors.a);
        console.log(colors);
        $("#"+r).trigger('change');
      });
    });
}
