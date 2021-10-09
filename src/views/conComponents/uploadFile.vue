<template>
  <div class="main" style="padding-bottom:0">
    <!--<el-form-item label="上传图片:" :label-width="labelWidth"  class="needStar" prop="logoUrl">-->
    <el-upload
      :ref="imgRef"
      @mouseenter.native="imgEnter"
      @mouseleave.native="imgleave"
      class="picture_upload_banner"
      drag
      :headers="{Auth:'Bearer '+ tokenStr}"
      :before-upload="beforeUpload"
      :action="baseUrl+'/common/upload/uploadFile'"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :limit="1"
      :on-exceed="handleExceed"
      :on-progress="uploadProcess"
      :on-error="uploadError"
      style="width:150px;height:110px"
    >
      <el-progress v-if="imgFlag == true" type="circle" :percentage="percent" style="margin-top: 20px"></el-progress>
      <template v-else-if="!imgForm[imgModelKey]?'':imgForm[imgModelKey].length>0">
        <img @click="clickImg" style="width:150px;height:150px;" :src="uploadImg" class="bannerUpload">
        <ul v-show="ishover"
            style="color:#fff;width:200px;height:30px;background: rgba(0,0,0,0.7);position:absolute;bottom:0;left:0;line-height: 30px;text-align: center">
          <li style="float:left;width:50%;">重新上传</li>
          <li @click="delImg" style="float:right;width:50%;">删除</li>
        </ul>
      </template>
      <template v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip"></div>
      </template>
    </el-upload>
    <!--<p class='imgInfo'></p>-->
    <p class='imgInfo' style="margin-bottom:0px;">
      仅允许上传{{type.toString()}}格式文件，文件大小{{size}}以下
      <span v-if="type.indexOf('mp4') !== -1">上传宽高比为 16/9</span>
    </p>
    <!--</el-form-item>-->
    <div style="display: none">
      <img src="showImg" alt="">
    </div>
  </div>
</template>
<script>
import config from '@/utils/config';
export default {
  name: 'uploadFile',
  props: {
    type: { // 文件类型
      type: Array,
      default: () => (['pdf', 'word', 'excel'])
    },
    size: { // 文件大小传入字符串包含MB/G
      type: String,
      default: () => ('3MB')
    },
    imgForm: { // 表单的formdata
      type: Object,
      require: true
    },
    imgIndex: {
      type: Number
    },
    imgModel: { // form.key
      type: String,
      require: true
    },
    imgRef: {
      type: String,
      default: 'imgRef'
    }
  },
  data () {
    return {
      width: '',
      height: '',
      uploadImg: require('@/assets/img/file.png'),
      baseUrl: config.baseUrl,
      tokenStr: '',
      imgFlag: false,
      ishover: false,
      percent: 0,
      imgchildIndex: this.imgIndex,
      imgModelKey: this.imgModel.indexOf('.') !== -1 ? (this.imgModel.split('.')[1]) : this.imgModel,
      formName: this.imgModel.indexOf('.') !== -1 ? (this.imgModel.split('.'))[0] : ''
    };
  },
  watch: {
    size () {
      // // size改变删除已上传文件
      if (this.imgForm[this.imgModelKey]) {
        this.delImg();
      }
    }
  },
  methods: {
    clickImg (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
    },
    delImg (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation();
      this.imgForm[this.imgModelKey] = '';
      this.$refs[this.imgRef].clearFiles();
      if (this.formName.length > 0) {
        this.$parent.form.validateField(this.imgModelKey);
      }
    },
    imgEnter () {
      this.ishover = true;
    },
    imgleave () {
      this.ishover = false;
    },
    beforeUpload (file) {
      // 文件类型 isType
      const isType = this.type.some((item) => {
        if (item === 'apk') {
          return file.type.indexOf('android') !== -1;
        }
        return file.type.indexOf(item) !== -1;
      });
      // 文件大小 isSize
      const limitNum = this.size.indexOf('MB') !== -1 ? this.size.replace('MB', '') * 1 : this.size.replace('G', '') * 1024;
      const isSize = file.size / 1024 / 1024 < limitNum;
      if (!isType) {
        this.$message.error('文件只能是' + this.type.toString() + '格式!');
        return false;
      }
      if (!isSize) {
        this.$message.error('文件大小不能超过' + this.size);
        return false;
      }
      // 视频宽高比
      const isWidth = this.isWidth(file, 19, 6, this);
      if (this.type.indexOf('mp4') === -1) {
        return isType && isSize;
      } else {
        return isWidth;
      }
    },
    // 判断视频宽高比
    isWidth (file, width, height, _this) {
      return new Promise((resolve, reject) => {
        const _URL = window.URL || window.webkitURL;
        const videoElement = document.createElement('video');
        videoElement.addEventListener('loadedmetadata', function (_event) {
          const vwidth = videoElement.videoWidth;
          const vheight = videoElement.videoHeight;
          const valid = vwidth / vheight === width / height;
          valid ? resolve() : reject(new Error('大小错误'));
        });
        videoElement.src = _URL.createObjectURL(file);
      }).then(() => {
        return file;
      }, () => {
        _this.showprocess = false;
        _this.$message.error('宽高比为' + width + '/' + height);
        return Promise.reject(new Error('大小错误'));
      });
    },
    uploadSuccess (res, file, fileList) {
      this.imgFlag = false;
      this.percent = 0;
      this.imgForm[this.imgModelKey] = res.data;
      this.$refs[this.imgRef].clearFiles();
      if (this.formName.length > 0) {
        this.$parent.form.validateField(this.imgModelKey);
      }
    },
    uploadProcess (event, file, fileList) {
      this.imgFlag = true;
      // console.log(event.percent);
      this.percent = Math.floor(event.percent);
    },
    uploadError () {
      this.$tool.message('上传失败', 'error');
      this.imgFlag = false;
      this.percent = 0;
    },
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传一份文件，请删除后再上传！');
    }
  },
  mounted () {
    const token = localStorage.getItem('tokenStr');
    this.tokenStr = token;
  }
};
</script>
<style scoped lang="less">
.picture_upload_banner {
  /deep/ .el-upload>.el-upload-dragger{
    width: 200px;
    height: 100px;
    .bannerUpload{
      width: 60px!important;
      height: 60px!important;
      margin: 20px auto;
    }
  }
}
.picture_upload_banner{
  width: 3000px;
}
.el-upload__tip{
  width: 200px
}
.imgInfo{
  font-size: 12px;
  width: 200px;
  /*height 25px*/
  margin: 0;
  line-height: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.image-preview {
  width: 178px;
  height: 178px;
  position: relative;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  float: left;
}

.image-preview .image-preview-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-preview .image-preview-wrapper img {
  width: 100%;
  height: 100%;
}

.image-preview .image-preview-action {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s;
  cursor: pointer;
  text-align: center;
  line-height: 200px;
}

.image-preview .image-preview-action .el-icon-delete {
  font-size: 32px;
}

.image-preview:hover .image-preview-action {
  opacity: 1;
}
</style>
