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
      style="width:150px;height:150px"
    >
      <el-progress v-if="imgFlag == true" type="circle" :percentage="percent" style="margin-top: 20px"></el-progress>
      <template v-else-if="!imgForm[imgModelKey]?'':imgForm[imgModelKey].length>0">
        <img @click="clickImg" style="width:150px;height:150px;" :src="imgForm[imgModelKey]" class="bannerUpload">
        <ul v-show="ishover"
            style="color:#fff;width:280px;height:30px;background: rgba(0,0,0,0.7);position:absolute;bottom:0;left:0;line-height: 30px;text-align: center">
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
      仅允许上传PNG.JPG.JPEG.GIF.BMP图片格式文件，文件大小2M以下,图片大小:{{size.width+'px*'+size.height+'px'}}</p>
    <!--</el-form-item>-->
    <div style="display: none">
      <img src="showImg" alt="">
    </div>
  </div>
</template>
<script>
import config from '@/utils/config';
export default {
  name: 'uploadImg',
  props: {
    size: { // 图片大小校验
      type: Object,
      default: () => ({
        width: 80,
        height: 80
      })
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
      // size改变、且已上传成功时，删除错误尺寸图片
      if (this.imgForm[this.imgModelKey]) {
        const width = this.size.width;
        const height = this.size.height;
        const imgUrl = this.imgForm[this.imgModelKey] + '?=' + Date.parse(new Date());
        const img = new Image();
        img.src = imgUrl;
        img.onload = () => {
          const valid = img.width === width && img.height === height;
          if (!valid) {
            this.$message.error(`图片大小必须是${this.size.width}*${this.size.height}px,请重新上传`);
            this.delImg();
          }
        };
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
      const isOk = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isOk) {
        this.$message.error('上传图片只能是PNG、JPG、JPEG、GIF、BMP格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }
      const that = this;

      const isSize = new Promise(function (resolve, reject) {
        const width = that.size.width;
        const height = that.size.height;
        const _URL = window.URL || window.webkitURL;
        const img = new Image();
        img.onload = function () {
          const valid = img.width === width && img.height === height;
          valid ? resolve() : reject(new Error('大小错误'));
        };
        img.src = _URL.createObjectURL(file);
      }).then(() => {
        return file;
      }, () => {
        that.$message.error(`图片大小必须是${that.size.width}*${that.size.height}px`);
        return Promise.reject(new Error('大小错误'));
      });
      return isOk && isLt2M && isSize;
    },
    uploadSuccess (res, file, fileList) {
      this.imgFlag = false;
      this.percent = 0;
      // if (this.imgModelKey === 'imgUrl') { // 详情存在img列表
      //   this.imgForm.children[this.imgchildIndex].imgUrl = res.data;
      //   console.log(this.imgForm, 'img');
      // } else { // 详情不存在img列表
      //   this.imgForm[this.imgModelKey] = res.data;
      // }
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
      this.$tool.message('图片上传失败', 'error');
      this.imgFlag = false;
      this.percent = 0;
    },
    handleExceed (files, fileList) {
      this.$message.warning('最多只能上传一张图片，请讲上一张删除后再上传！');
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
      width: 300px;
      height: 150px;
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
    width: 300px;
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
