<template>
   <section>
       <el-table :data="user" style="width: 100%">
           <el-table-column prop="name" label="用户名"></el-table-column>
           <el-table-column prop="password" label="密码"></el-table-column>
           <el-table-column prop="mobile" label="手机号"></el-table-column>
           <el-table-column prop="email" label="邮箱"></el-table-column>
           <el-table-column prop="note" label="备注"></el-table-column>
           <el-table-column prop="code" label="code"></el-table-column>
       </el-table>
   </section>
</template>

<script>
    export default {
        name: "User",
        data() {
            return {
                user:[{
                    version:'',
                    code:'',
                    name:'',
                    password:'',
                    mobile:'',
                    email:'',
                    note:''
                }]
            }
        },
        methods:{


        }
    }
</script>

<style scoped>

</style>
