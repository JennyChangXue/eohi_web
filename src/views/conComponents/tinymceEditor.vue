<template>
<div>
  <editor :init="editorInit" v-model="content"></editor>
</div>
</template>

<script>
// 富文本编辑器
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver/theme';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/icons/default/icons';
import 'tinymce/plugins/image';
import 'tinymce/plugins/imagetools';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
export default {
  name: 'tinymceEditor',
  components: { Editor },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    content (value) {
      this.$emit('input', value);
      // console.log(value);
      return '';
    }
  },
  data () {
    return {
      content: '',
      editorInit: {
        language_url: '/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: 400,
        menubar: 'edit insert view format table',
        plugins: 'link lists image imagetools code table colorpicker textcolor wordcount contextmenu',
        toolbar: ['bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo ', ' link unlink image code | removeformat'],
        branding: false,
        fontsize_formats: '12px 0.12rem 14px 0.14rem 16px 0.16rem 18px 0.18rem 20px 0.20rem 24px 0.24rem 26px 0.26rem 28px 0.28rem 30px 0.30rem 34px 0.34rem 36px 0.36rem 40px 0.40rem',
        // 图片上传配置
        image_advtab: true,
        table_default_styles: {
          width: '100%',
          borderCollapse: 'collapse'
        },
        image_title: false, // 是否开启图片标题设置的选择，这里设置否
        automatic_uploads: true,
        // 图片异步上传处理函数
        images_upload_handler: (blobInfo, success, failure) => {
          const formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());
          this.$request.login.imgUpload(formData, true, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => {
            if (res.code === 200) {
              success(res.data);
            } else {
              failure(res.message);
            }
          });
        }
      }
    };
  },
  mounted () {
    tinymce.init({});
    // console.log(this.content);
  }
};
</script>

<style scoped>

</style>
